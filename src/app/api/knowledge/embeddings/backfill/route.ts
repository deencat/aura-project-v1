import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { backfillKnowledgeChunkEmbeddings } from "@/services/knowledge.service"

const schema = z.object({
  limit: z.number().int().min(1).max(500).default(120),
  batchSize: z.number().int().min(1).max(64).default(16),
})

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  let body: unknown = {}
  try {
    body = await request.json().catch(() => ({}))
  } catch {
    body = {}
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error", issues: parsed.error.flatten() }, { status: 400 })
  }

  const result = await backfillKnowledgeChunkEmbeddings(parsed.data)
  return NextResponse.json({ ok: true, ...result })
}

