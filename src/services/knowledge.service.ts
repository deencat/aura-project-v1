import { prisma } from "@/lib/prisma"

export type KnowledgeTier = "T0" | "T1" | "T2" | "T3"
export type KnowledgeStatus = "staging" | "active" | "archived"

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

    await tx.knowledgeChunk.createMany({
      data: chunks.map((text, idx) => ({
        documentId: doc.id,
        chunkIndex: idx,
        text,
        tokenCount: null,
        embeddingModel: null,
        embeddingVersion: null,
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

  // Heuristic retrieval (KB-2): keyword contains + tier/status/lang filters.
  // Ranking improvements (hybrid + rerank) will come later once embeddings are added.
  const rows = await prisma.knowledgeChunk.findMany({
    where: {
      OR: whereOr,
      document: {
        tier,
        status,
        language: { in: languages },
      },
    },
    take: limit,
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

  return rows
}

