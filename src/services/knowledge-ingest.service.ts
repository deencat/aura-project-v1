import { createHash } from "crypto"
import { XMLParser } from "fast-xml-parser"
import { prisma } from "@/lib/prisma"
import { createKnowledgeDocument, type KnowledgeTier, type KnowledgeStatus } from "@/services/knowledge.service"

export type KnowledgeIngestFeed = {
  name: string
  url: string
  language?: string
  topics?: string[]
}

export type RunKnowledgeIngestResult = {
  ok: true
  runId: string
  feeds: Array<{
    name: string
    url: string
    scanned: number
    created: number
    skipped: number
    errors: number
  }>
  totals: { scanned: number; created: number; skipped: number; errors: number }
}

const DEFAULT_FEEDS_ZHHK: KnowledgeIngestFeed[] = [
  {
    name: "政府新聞處 GIA｜新聞公報（繁中）",
    url: "http://www.info.gov.hk/gia/rss/general_zh.xml",
    language: "zh-HK",
    topics: ["香港", "新聞公報", "消費安全", "產品安全"],
  },
]

function getMaxItemsPerFeed() {
  const n = Number(process.env.KB_INGEST_MAX_ITEMS_PER_FEED ?? "12")
  if (!Number.isFinite(n)) return 12
  return Math.max(1, Math.min(Math.floor(n), 50))
}

function getDefaultTier(): KnowledgeTier {
  return (process.env.KB_INGEST_TIER as KnowledgeTier) || "T3"
}

function getDefaultStatus(): KnowledgeStatus {
  return (process.env.KB_INGEST_STATUS as KnowledgeStatus) || "staging"
}

function getFetchTimeoutMs() {
  const n = Number(process.env.KB_INGEST_FETCH_TIMEOUT_MS ?? "12000")
  if (!Number.isFinite(n)) return 12000
  return Math.max(2000, Math.min(Math.floor(n), 60000))
}

function truncate(s: string, max: number) {
  return s.length <= max ? s : `${s.slice(0, Math.max(0, max - 1))}…`
}

function stripHtml(input: string) {
  return (
    input
      // Remove script/style blocks first.
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      // Remove tags.
      .replace(/<\/?[^>]+>/g, " ")
      // Collapse whitespace.
      .replace(/\s+/g, " ")
      .trim()
  )
}

function sha256Hex(s: string) {
  return createHash("sha256").update(s, "utf8").digest("hex")
}

type NormalizedFeedItem = {
  title: string
  link: string
  publishedAt: string | null
  summary: string | null
}

function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function normalizeAtomLink(v: any): string | null {
  if (!v) return null
  if (typeof v === "string") return v
  if (Array.isArray(v)) {
    for (const x of v) {
      const best = normalizeAtomLink(x)
      if (best) return best
    }
    return null
  }
  if (typeof v === "object") {
    if (typeof v.href === "string") return v.href
    if (typeof v["@_href"] === "string") return v["@_href"]
  }
  return null
}

function normalizeRssLink(v: any): string | null {
  if (!v) return null
  if (typeof v === "string") return v
  if (typeof v === "object") {
    if (typeof v.link === "string") return v.link
    if (typeof v["@_href"] === "string") return v["@_href"]
  }
  return null
}

function parseFeedXml(xml: string): NormalizedFeedItem[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
    parseTagValue: true,
    trimValues: true,
  })

  const data: any = parser.parse(xml)

  // RSS 2.0: rss.channel.item[]
  const rssItems = asArray(data?.rss?.channel?.item).map((it: any) => {
    const title = (it?.title ?? "").toString().trim()
    const link = normalizeRssLink(it?.link) ?? ""
    const publishedAt = (it?.pubDate ?? it?.date ?? null) ? new Date(it.pubDate ?? it.date).toISOString() : null
    const summaryRaw = (it?.description ?? it?.["content:encoded"] ?? it?.content ?? null) as any
    const summary = summaryRaw ? stripHtml(summaryRaw.toString()) : null
    return { title, link, publishedAt, summary }
  })

  if (rssItems.length > 0) return rssItems.filter((x) => x.title && x.link)

  // Atom: feed.entry[]
  const atomItems = asArray(data?.feed?.entry).map((e: any) => {
    const title = (e?.title?.["#text"] ?? e?.title ?? "").toString().trim()
    const link = normalizeAtomLink(e?.link) ?? ""
    const when = e?.published ?? e?.updated ?? null
    const publishedAt = when ? new Date(when).toISOString() : null
    const summaryRaw = e?.summary?.["#text"] ?? e?.summary ?? e?.content?.["#text"] ?? e?.content ?? null
    const summary = summaryRaw ? stripHtml(summaryRaw.toString()) : null
    return { title, link, publishedAt, summary }
  })

  return atomItems.filter((x) => x.title && x.link)
}

async function fetchText(url: string) {
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), getFetchTimeoutMs())
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": process.env.KB_INGEST_USER_AGENT || "AuraKBIngest/1.0 (+http://localhost:3000)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, text/plain, */*",
      },
      cache: "no-store",
      signal: ctrl.signal,
    })
    if (!res.ok) {
      throw new Error(`fetch_failed:${res.status}`)
    }
    return await res.text()
  } finally {
    clearTimeout(timeout)
  }
}

function parseFeedsFromEnv(): KnowledgeIngestFeed[] | null {
  const raw = process.env.KB_INGEST_FEEDS_JSON?.trim()
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    const feeds: KnowledgeIngestFeed[] = parsed
      .map((x: any) => ({
        name: typeof x?.name === "string" ? x.name : "",
        url: typeof x?.url === "string" ? x.url : "",
        language: typeof x?.language === "string" ? x.language : undefined,
        topics: Array.isArray(x?.topics) ? x.topics.filter((t: any) => typeof t === "string") : undefined,
      }))
      .filter((f) => f.name && f.url)
    return feeds.length ? feeds : null
  } catch {
    return null
  }
}

async function ingestOneFeed(feed: KnowledgeIngestFeed) {
  const xml = await fetchText(feed.url)
  const items = parseFeedXml(xml).slice(0, getMaxItemsPerFeed())

  const tier = getDefaultTier()
  const status = getDefaultStatus()
  const language = feed.language ?? process.env.KB_INGEST_LANGUAGE ?? "zh-HK"
  const topics = (feed.topics ?? []).slice(0, 20)

  let scanned = 0
  let created = 0
  let skipped = 0
  let errors = 0
  const errorSamples: Array<{ url: string; title: string; reason: string }> = []

  for (const item of items) {
    scanned += 1
    try {
      const sourceUrl = item.link
      const hash = sha256Hex(`${sourceUrl}|${item.publishedAt ?? ""}|${item.title}`)

      const exists = await prisma.knowledgeDocument.findFirst({
        where: {
          OR: [{ sourceUrl }, { hash }],
        },
        select: { id: true },
      })
      if (exists) {
        skipped += 1
        continue
      }

      const title = truncate(`【${tier}】${feed.name}：${item.title}`, 200)
      const summary = item.summary ? truncate(item.summary, 4000) : ""

      const content = [
        `來源：${feed.name}`,
        `連結：${sourceUrl}`,
        item.publishedAt ? `發佈：${new Date(item.publishedAt).toLocaleString("zh-HK")}` : null,
        "",
        title.replace(/^【[^】]+】/, "").trim(),
        "",
        summary || "（RSS 未提供摘要；待後續抓取全文）",
      ]
        .filter(Boolean)
        .join("\n")
        .trim()

      if (content.length < 10) {
        skipped += 1
        continue
      }

      await createKnowledgeDocument({
        tier,
        status,
        language,
        sourceUrl,
        title,
        publishedAt: item.publishedAt,
        hash,
        topics,
        content,
      })

      created += 1
    } catch (e: any) {
      errors += 1
      if (errorSamples.length < 5) {
        errorSamples.push({
          url: item.link,
          title: item.title,
          reason: e?.message ? String(e.message) : "unknown_error",
        })
      }
    }
  }

  return { scanned, created, skipped, errors, errorSamples }
}

export async function runKnowledgeIngest(args?: { feeds?: KnowledgeIngestFeed[] }): Promise<RunKnowledgeIngestResult> {
  const feeds = args?.feeds ?? parseFeedsFromEnv() ?? DEFAULT_FEEDS_ZHHK

  const run = await prisma.ingestionRun.create({
    data: {
      status: "running",
      stats: {
        feeds: feeds.map((f) => ({ name: f.name, url: f.url, language: f.language, topics: f.topics })),
      },
    },
    select: { id: true },
  })

  const results: RunKnowledgeIngestResult["feeds"] = []
  let scanned = 0
  let created = 0
  let skipped = 0
  let errors = 0
  const errorLog: Array<any> = []

  for (const feed of feeds) {
    try {
      const r = await ingestOneFeed(feed)
      results.push({ name: feed.name, url: feed.url, scanned: r.scanned, created: r.created, skipped: r.skipped, errors: r.errors })
      scanned += r.scanned
      created += r.created
      skipped += r.skipped
      errors += r.errors
      if (r.errorSamples.length > 0) {
        errorLog.push({ feed: { name: feed.name, url: feed.url }, samples: r.errorSamples })
      }
    } catch (e: any) {
      results.push({ name: feed.name, url: feed.url, scanned: 0, created: 0, skipped: 0, errors: 1 })
      errors += 1
      errorLog.push({ feed: { name: feed.name, url: feed.url }, reason: e?.message ? String(e.message) : "feed_failed" })
    }
  }

  const stats = { feeds: results, totals: { scanned, created, skipped, errors } }

  await prisma.ingestionRun.update({
    where: { id: run.id },
    data: {
      endedAt: new Date(),
      status: errors > 0 ? "failed" : "success",
      stats,
      errorLog: errorLog.length ? errorLog : null,
    },
  })

  return { ok: true, runId: run.id, feeds: results, totals: { scanned, created, skipped, errors } }
}

