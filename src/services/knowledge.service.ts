import { prisma } from "@/lib/prisma"

export type KnowledgeTier = "T0" | "T1" | "T2" | "T3"
export type KnowledgeStatus = "staging" | "active" | "archived"

function getEmbeddingApiKey() {
  return process.env.EMBEDDING_API_KEY || process.env.OPENROUTER_API_KEY || ""
}

function getEmbeddingModel() {
  // Default to a non-OpenAI embedding model for HK compatibility.
  return process.env.EMBEDDING_MODEL || "qwen/qwen3-embedding-4b"
}

function isNumberArray(v: unknown): v is number[] {
  return Array.isArray(v) && v.length > 0 && v.every((x) => typeof x === "number" && Number.isFinite(x))
}

function cosineSimilarity(a: number[], b: number[]) {
  const n = Math.min(a.length, b.length)
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < n; i++) {
    const av = a[i]!
    const bv = b[i]!
    dot += av * bv
    na += av * av
    nb += bv * bv
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb)
  return denom === 0 ? 0 : dot / denom
}

async function embedTexts(args: { inputs: string[]; inputType?: "search_query" | "search_document" }) {
  const apiKey = getEmbeddingApiKey()
  if (!apiKey) return null

  const res = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model: getEmbeddingModel(),
      input: args.inputs,
      encoding_format: "float",
      input_type: args.inputType,
    }),
  })

  const data: any = await res.json().catch(() => ({}))
  if (!res.ok) return null

  const rows = data?.data
  if (!Array.isArray(rows) || rows.length === 0) return null
  const embeddings = rows.map((r: any) => r?.embedding).filter(isNumberArray)
  if (embeddings.length !== args.inputs.length) return null
  return embeddings
}

export async function backfillKnowledgeChunkEmbeddings(args: { limit?: number; batchSize?: number }) {
  const limit = Math.max(1, Math.min(args.limit ?? 120, 500))
  const batchSize = Math.max(1, Math.min(args.batchSize ?? 16, 64))

  const apiKey = getEmbeddingApiKey()
  if (!apiKey) {
    return { ok: false as const, error: "missing_embedding_key", embedded: 0, scanned: 0 }
  }

  let embedded = 0
  let scanned = 0
  let batches = 0

  while (embedded < limit) {
    const remaining = limit - embedded
    const take = Math.min(batchSize, remaining)

    const rows = await prisma.knowledgeChunk.findMany({
      where: { embedding: null },
      orderBy: [{ updatedAt: "desc" }],
      take,
      select: { id: true, text: true },
    })

    if (rows.length === 0) break
    scanned += rows.length
    batches += 1

    const embeddings = await embedTexts({ inputs: rows.map((r) => r.text), inputType: "search_document" })
    if (!embeddings) {
      return { ok: false as const, error: "embedding_failed", embedded, scanned, batches }
    }

    await prisma.$transaction(
      rows.map((r, idx) =>
        prisma.knowledgeChunk.update({
          where: { id: r.id },
          data: {
            embedding: embeddings[idx] ?? null,
            embeddingModel: getEmbeddingModel(),
            embeddingVersion: "openrouter:v1",
          },
        })
      )
    )

    embedded += rows.length
  }

  return { ok: true as const, embedded, scanned, batches, model: getEmbeddingModel() }
}

export type CreateKnowledgeDocumentInput = {
  tier: KnowledgeTier
  status?: KnowledgeStatus
  language: string
  sourceUrl?: string | null
  title?: string | null
  publishedAt?: string | null
  hash?: string | null
  trustScore?: number | null
  topics?: string[]
  content: string
  chunkCharLimit?: number
}

function normalizeTopics(topics: string[] | undefined) {
  const cleaned = (topics ?? [])
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 20)
  return Array.from(new Set(cleaned))
}

function chunkTextByParagraphs(args: { text: string; chunkCharLimit: number }) {
  const { text, chunkCharLimit } = args
  const normalized = text.replace(/\r\n/g, "\n").trim()
  if (!normalized) return []

  const paras = normalized
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  const chunks: string[] = []
  let current = ""

  for (const p of paras) {
    const next = current ? `${current}\n\n${p}` : p
    if (next.length <= chunkCharLimit) {
      current = next
      continue
    }

    if (current) chunks.push(current)
    if (p.length <= chunkCharLimit) {
      current = p
      continue
    }

    // Fallback: hard-split long paragraphs.
    for (let i = 0; i < p.length; i += chunkCharLimit) {
      chunks.push(p.slice(i, i + chunkCharLimit))
    }
    current = ""
  }

  if (current) chunks.push(current)
  return chunks
}

export async function createKnowledgeDocument(input: CreateKnowledgeDocumentInput) {
  const chunkCharLimit = Math.max(400, Math.min(input.chunkCharLimit ?? 1400, 4000))
  const chunks = chunkTextByParagraphs({ text: input.content, chunkCharLimit })
  if (chunks.length === 0) throw new Error("Content is empty.")

  const topics = normalizeTopics(input.topics)

  return await prisma.$transaction(async (tx) => {
    const doc = await tx.knowledgeDocument.create({
      data: {
        tier: input.tier,
        status: input.status ?? "staging",
        language: input.language,
        sourceUrl: input.sourceUrl ?? null,
        title: input.title ?? null,
        publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
        hash: input.hash ?? null,
        trustScore: input.trustScore ?? null,
        topics,
      },
    })

    const embeddings = await embedTexts({ inputs: chunks, inputType: "search_document" })

    await tx.knowledgeChunk.createMany({
      data: chunks.map((text, idx) => ({
        documentId: doc.id,
        chunkIndex: idx,
        text,
        tokenCount: null,
        embedding: embeddings?.[idx] ?? null,
        embeddingModel: embeddings ? getEmbeddingModel() : null,
        embeddingVersion: embeddings ? "openrouter:v1" : null,
      })),
    })

    return { document: doc, chunkCount: chunks.length }
  })
}

export async function listKnowledgeDocuments(args: {
  status?: KnowledgeStatus
  tier?: KnowledgeTier
  language?: string
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 50, 200))
  return await prisma.knowledgeDocument.findMany({
    where: {
      status: args.status,
      tier: args.tier,
      language: args.language,
    },
    orderBy: [{ updatedAt: "desc" }],
    take: limit,
    include: {
      chunks: {
        select: { id: true },
      },
    },
  })
}

function extractQueryTerms(query: string) {
  const normalized = query
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
  if (!normalized) return []

  // Chinese: no spaces; still works by using 2-3 character windows from the original query.
  const hasSpaces = normalized.includes(" ")
  const terms = hasSpaces
    ? normalized.split(" ")
    : Array.from(new Set([normalized.slice(0, 2), normalized.slice(0, 3), normalized.slice(1, 3)].filter(Boolean)))

  return terms.filter((t) => t.length >= 2).slice(0, 8)
}

export async function retrieveKnowledgeChunks(args: {
  query: string
  locale: string
  tier?: KnowledgeTier
  status?: KnowledgeStatus
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 8, 16))
  const tier = args.tier ?? "T0"
  const status = args.status ?? "active"

  const locale = args.locale
  const languages =
    locale === "zh-HK"
      ? ["zh-HK", "zh-Hant"]
      : locale === "zh-Hans"
        ? ["zh-Hans", "zh-Hant"]
        : locale === "en"
          ? ["en"]
          : [locale, "zh-HK", "zh-Hant"]

  const terms = extractQueryTerms(args.query)
  if (terms.length === 0) return []

  const whereOr = terms.map((t) => ({ text: { contains: t, mode: "insensitive" as const } }))

  // KB-2 (upgraded): keyword candidate set, then rerank with embeddings when available.
  const candidateRows = await prisma.knowledgeChunk.findMany({
    where: {
      OR: whereOr,
      document: {
        tier,
        status,
        language: { in: languages },
      },
    },
    take: 60,
    orderBy: [{ updatedAt: "desc" }],
    include: {
      document: {
        select: {
          id: true,
          tier: true,
          status: true,
          language: true,
          title: true,
          sourceUrl: true,
          topics: true,
          updatedAt: true,
        },
      },
    },
  })

  const queryEmbedding = (await embedTexts({ inputs: [args.query], inputType: "search_query" }))?.[0] ?? null

  if (!queryEmbedding) {
    return candidateRows.slice(0, limit)
  }

  const scored = candidateRows.map((row) => {
    const emb = row.embedding
    const vec = isNumberArray(emb) ? emb : null
    const sim = vec ? cosineSimilarity(queryEmbedding, vec) : 0
    return { row, sim }
  })

  scored.sort((a, b) => b.sim - a.sim)
  return scored.slice(0, limit).map((s) => s.row)
}

export async function listKnowledgeRollups(args: {
  topic?: string
  language?: string
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 20, 100))
  return await prisma.knowledgeRollup.findMany({
    where: {
      topic: args.topic,
      language: args.language,
    },
    orderBy: [{ periodEnd: "desc" }],
    take: limit,
  })
}

export async function createKnowledgeRollup(args: {
  topic: string
  language: string
  periodStart: Date
  periodEnd: Date
  summaryText: string
}) {
  return await prisma.knowledgeRollup.create({
    data: {
      topic: args.topic,
      language: args.language,
      periodStart: args.periodStart,
      periodEnd: args.periodEnd,
      summaryText: args.summaryText,
    },
  })
}

export async function getRollupContext(args: {
  query: string
  locale: string
  topic?: string
  limit?: number
}) {
  const limit = Math.max(1, Math.min(args.limit ?? 3, 5))
  const locale = args.locale
  const languages =
    locale === "zh-HK"
      ? ["zh-HK", "zh-Hant"]
      : locale === "zh-Hans"
        ? ["zh-Hans", "zh-Hant"]
        : locale === "en"
          ? ["en"]
          : [locale, "zh-HK", "zh-Hant"]

  const rollups = await prisma.knowledgeRollup.findMany({
    where: {
      language: { in: languages },
      ...(args.topic ? { topic: args.topic } : {}),
    },
    orderBy: [{ periodEnd: "desc" }],
    take: limit,
  })

  return rollups
}

