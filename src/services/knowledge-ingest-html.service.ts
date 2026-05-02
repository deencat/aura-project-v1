import { createHash } from "crypto"
import * as cheerio from "cheerio"
import { prisma } from "@/lib/prisma"
import { createKnowledgeDocument, type KnowledgeTier, type KnowledgeStatus } from "@/services/knowledge.service"

export type KnowledgeIngestHtmlSource = {
  name: string
  listUrl: string
  language?: string
  topics?: string[]
  // Optional filter: only keep URLs that match this pattern.
  includeUrlRegex?: string
  // Optional filter: drop URLs that match this pattern.
  excludeUrlRegex?: string
}

export type RunKnowledgeHtmlIngestResult = {
  ok: true
  runId: string
  sources: Array<{
    name: string
    listUrl: string
    discovered: number
    scanned: number
    created: number
    skipped: number
    skippedExists: number
    skippedTooShort: number
    errors: number
  }>
  totals: { discovered: number; scanned: number; created: number; skipped: number; errors: number }
}

const DEFAULT_HTML_SOURCES_ZHHK: KnowledgeIngestHtmlSource[] = [
  {
    name: "she.com｜Beauty",
    listUrl: "https://www.she.com/beauty",
    language: "zh-HK",
    topics: ["香港", "美容", "護膚", "彩妝", "趨勢"],
    includeUrlRegex: "^https?://(www\\.)?she\\.com/beauty/",
    excludeUrlRegex: "/(tag|category|page|registration|about-us)/",
  },
  {
    name: "ELLE HK｜Beauty & Health（blogs）",
    listUrl: "https://blogs.elle.com.hk/beauty_and_health",
    language: "zh-HK",
    topics: ["香港", "美容", "護膚", "健康", "趨勢"],
    includeUrlRegex: "^https?://blogs\\.elle\\.com\\.hk/",
  },
  {
    name: "Cosmopolitan HK｜Beauty",
    listUrl: "https://www.cosmopolitan.com.hk/beauty",
    language: "zh-HK",
    topics: ["香港", "美容", "護膚", "彩妝", "產品"],
    includeUrlRegex: "^https?://(www\\.)?cosmopolitan\\.com\\.hk/",
  },
  {
    name: "U Beauty｜美妝護膚（首頁）",
    listUrl: "https://ubeauty.com.hk/",
    language: "zh-HK",
    topics: ["香港", "美容", "護膚", "彩妝", "產品"],
    includeUrlRegex: "^https?://(www\\.)?ubeauty\\.com\\.hk/",
  },
  {
    name: "TopBeauty｜Beauty tag",
    listUrl: "https://topbeautyhk.com/tag/beauty",
    language: "zh-HK",
    topics: ["香港", "美容", "護膚", "彩妝", "趨勢"],
    includeUrlRegex: "^https?://(www\\.)?topbeautyhk\\.com/",
    excludeUrlRegex: "/(tag|category|about|privacy)/$",
  },
]

function getMaxLinksPerSource() {
  const n = Number(process.env.KB_INGEST_HTML_MAX_LINKS_PER_SOURCE ?? "25")
  if (!Number.isFinite(n)) return 25
  return Math.max(5, Math.min(Math.floor(n), 120))
}

function getMaxArticlesPerSource() {
  const n = Number(process.env.KB_INGEST_HTML_MAX_ARTICLES_PER_SOURCE ?? "8")
  if (!Number.isFinite(n)) return 8
  return Math.max(1, Math.min(Math.floor(n), 30))
}

function getFetchTimeoutMs() {
  const n = Number(process.env.KB_INGEST_FETCH_TIMEOUT_MS ?? "12000")
  if (!Number.isFinite(n)) return 12000
  return Math.max(2000, Math.min(Math.floor(n), 60000))
}

function getDefaultTier(): KnowledgeTier {
  return (process.env.KB_INGEST_TIER as KnowledgeTier) || "T3"
}

function getDefaultStatus(): KnowledgeStatus {
  return (process.env.KB_INGEST_STATUS as KnowledgeStatus) || "staging"
}

function getUserAgent() {
  return process.env.KB_INGEST_USER_AGENT || "AuraKBIngest/1.0 (+http://localhost:3000)"
}

function sha256Hex(s: string) {
  return createHash("sha256").update(s, "utf8").digest("hex")
}

function stripAndCollapseText(s: string) {
  return s.replace(/\s+/g, " ").trim()
}

async function fetchText(url: string) {
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), getFetchTimeoutMs())
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": getUserAgent(),
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
      redirect: "follow",
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`fetch_failed:${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeUrl(baseUrl: string, href: string) {
  try {
    const u = new URL(href, baseUrl)
    // Canonicalize: drop common tracking parameters.
    const drop = ["fbclid", "gclid", "igshid", "mc_cid", "mc_eid", "mkt_tok"]
    for (const k of Array.from(u.searchParams.keys())) {
      if (k.toLowerCase().startsWith("utm_")) u.searchParams.delete(k)
    }
    for (const k of drop) u.searchParams.delete(k)
    // Some sites append empty query string; normalize.
    if ([...u.searchParams.keys()].length === 0) u.search = ""
    return u.toString()
  } catch {
    return null
  }
}

function uniqueKeepOrder<T>(items: T[]) {
  const seen = new Set<string>()
  const out: T[] = []
  for (const it of items) {
    const key = String(it)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(it)
  }
  return out
}

function compileRegex(pattern?: string) {
  if (!pattern) return null
  try {
    return new RegExp(pattern)
  } catch {
    return null
  }
}

function extractCandidateUrls(args: { html: string; baseUrl: string; source: KnowledgeIngestHtmlSource }) {
  const $ = cheerio.load(args.html)
  const includeRe = compileRegex(args.source.includeUrlRegex)
  const excludeRe = compileRegex(args.source.excludeUrlRegex)

  const urls = $("a[href]")
    .toArray()
    .map((el) => $(el).attr("href"))
    .filter((h): h is string => typeof h === "string" && h.trim().length > 0)
    .map((href) => normalizeUrl(args.baseUrl, href))
    .filter((u): u is string => !!u)
    .filter((u) => u.startsWith("http://") || u.startsWith("https://"))
    .map((u) => u.split("#")[0]!)
    .filter(Boolean)
    .filter((u) => (includeRe ? includeRe.test(u) : true))
    .filter((u) => (excludeRe ? !excludeRe.test(u) : true))
    .slice(0, getMaxLinksPerSource())

  return uniqueKeepOrder(urls)
}

function extractArticleText(args: { html: string; baseUrl: string }) {
  const $ = cheerio.load(args.html)

  // Remove obvious boilerplate.
  $("script,noscript,style,svg,nav,footer,header,aside,form,iframe").remove()

  const title =
    stripAndCollapseText($("meta[property='og:title']").attr("content") || "") ||
    stripAndCollapseText($("title").first().text() || "") ||
    null

  const publishedAt =
    $("meta[property='article:published_time']").attr("content") ||
    $("meta[name='pubdate']").attr("content") ||
    $("time[datetime]").first().attr("datetime") ||
    null

  // Prefer <article>, then <main>, else body.
  const root = $("article").first().length ? $("article").first() : $("main").first().length ? $("main").first() : $("body")

  const text = stripAndCollapseText(root.text())

  // Try to keep it reasonably sized for chunking.
  const clipped = text.length > 20000 ? text.slice(0, 20000) : text

  return {
    title,
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
    text: clipped,
  }
}

function parseSourcesFromEnv(): KnowledgeIngestHtmlSource[] | null {
  const raw = process.env.KB_INGEST_HTML_SOURCES_JSON?.trim()
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    const sources: KnowledgeIngestHtmlSource[] = parsed
      .map((x: any) => ({
        name: typeof x?.name === "string" ? x.name : "",
        listUrl: typeof x?.listUrl === "string" ? x.listUrl : "",
        language: typeof x?.language === "string" ? x.language : undefined,
        topics: Array.isArray(x?.topics) ? x.topics.filter((t: any) => typeof t === "string") : undefined,
        includeUrlRegex: typeof x?.includeUrlRegex === "string" ? x.includeUrlRegex : undefined,
        excludeUrlRegex: typeof x?.excludeUrlRegex === "string" ? x.excludeUrlRegex : undefined,
      }))
      .filter((s) => s.name && s.listUrl)
    return sources.length ? sources : null
  } catch {
    return null
  }
}

async function ingestOneSource(source: KnowledgeIngestHtmlSource) {
  const listHtml = await fetchText(source.listUrl)
  const candidates = extractCandidateUrls({ html: listHtml, baseUrl: source.listUrl, source })
  const targetUrls = candidates.slice(0, getMaxArticlesPerSource())

  const tier = getDefaultTier()
  const status = getDefaultStatus()
  const language = source.language ?? process.env.KB_INGEST_LANGUAGE ?? "zh-HK"
  const topics = (source.topics ?? []).slice(0, 20)

  let scanned = 0
  let created = 0
  let skipped = 0
  let skippedExists = 0
  let skippedTooShort = 0
  let errors = 0

  const errorSamples: Array<{ url: string; reason: string }> = []

  for (const url of targetUrls) {
    scanned += 1
    try {
      const hash = sha256Hex(url)
      const exists = await prisma.knowledgeDocument.findFirst({
        where: { OR: [{ sourceUrl: url }, { hash }] },
        select: { id: true },
      })
      if (exists) {
        skipped += 1
        skippedExists += 1
        if (errorSamples.length < 5) errorSamples.push({ url, reason: "exists" })
        continue
      }

      const html = await fetchText(url)
      const article = extractArticleText({ html, baseUrl: url })
      const title = article.title ? `【${tier}】${source.name}：${article.title}`.slice(0, 200) : `【${tier}】${source.name}`
      const body = article.text

      if (!body || body.length < 300) {
        skipped += 1
        skippedTooShort += 1
        if (errorSamples.length < 5) errorSamples.push({ url, reason: `too_short:${body?.length ?? 0}` })
        continue
      }

      const content = [
        `來源：${source.name}`,
        `連結：${url}`,
        article.publishedAt ? `發佈：${new Date(article.publishedAt).toLocaleString("zh-HK")}` : null,
        "",
        body,
      ]
        .filter(Boolean)
        .join("\n")
        .trim()

      await createKnowledgeDocument({
        tier,
        status,
        language,
        sourceUrl: url,
        title,
        publishedAt: article.publishedAt,
        hash,
        topics,
        content,
        chunkCharLimit: 1600,
      })

      created += 1
    } catch (e: any) {
      errors += 1
      if (errorSamples.length < 5) errorSamples.push({ url, reason: e?.message ? String(e.message) : "unknown_error" })
    }
  }

  return { discovered: candidates.length, scanned, created, skipped, skippedExists, skippedTooShort, errors, errorSamples }
}

export async function runKnowledgeHtmlIngest(args?: { sources?: KnowledgeIngestHtmlSource[] }): Promise<RunKnowledgeHtmlIngestResult> {
  const sources = args?.sources ?? parseSourcesFromEnv() ?? DEFAULT_HTML_SOURCES_ZHHK

  const run = await prisma.ingestionRun.create({
    data: {
      status: "running",
      stats: { kind: "html", sources: sources.map((s) => ({ name: s.name, listUrl: s.listUrl })) },
    },
    select: { id: true },
  })

  let discovered = 0
  let scanned = 0
  let created = 0
  let skipped = 0
  let errors = 0
  const results: RunKnowledgeHtmlIngestResult["sources"] = []
  const errorLog: Array<any> = []

  for (const source of sources) {
    try {
      const r = await ingestOneSource(source)
      results.push({
        name: source.name,
        listUrl: source.listUrl,
        discovered: r.discovered,
        scanned: r.scanned,
        created: r.created,
        skipped: r.skipped,
        skippedExists: r.skippedExists,
        skippedTooShort: r.skippedTooShort,
        errors: r.errors,
      })
      discovered += r.discovered
      scanned += r.scanned
      created += r.created
      skipped += r.skipped
      errors += r.errors
      if (r.errorSamples.length) errorLog.push({ source: { name: source.name, listUrl: source.listUrl }, samples: r.errorSamples })
    } catch (e: any) {
      results.push({
        name: source.name,
        listUrl: source.listUrl,
        discovered: 0,
        scanned: 0,
        created: 0,
        skipped: 0,
        skippedExists: 0,
        skippedTooShort: 0,
        errors: 1,
      })
      errors += 1
      errorLog.push({ source: { name: source.name, listUrl: source.listUrl }, reason: e?.message ? String(e.message) : "source_failed" })
    }
  }

  const stats = { kind: "html", sources: results, totals: { discovered, scanned, created, skipped, errors } }

  await prisma.ingestionRun.update({
    where: { id: run.id },
    data: {
      endedAt: new Date(),
      status: errors > 0 ? "failed" : "success",
      stats,
      errorLog: errorLog.length ? errorLog : null,
    },
  })

  return { ok: true, runId: run.id, sources: results, totals: { discovered, scanned, created, skipped, errors } }
}

