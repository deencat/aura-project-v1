import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { createKnowledgeRollup, listKnowledgeRollups } from "@/services/knowledge.service"

const createSchema = z.object({
  topic: z.string().min(2).max(60),
  language: z.string().min(2).max(20),
  periodStart: z.string(),
  periodEnd: z.string(),
  summaryText: z.string().min(50),
})

export async function GET(request: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const topic = searchParams.get("topic") ?? undefined
  const language = searchParams.get("language") ?? undefined
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined

  const rollups = await listKnowledgeRollups({ topic, language, limit })
  return NextResponse.json({ ok: true, rollups })
}

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error", issues: parsed.error.flatten() }, { status: 400 })
  }

  const { topic, language, periodStart, periodEnd, summaryText } = parsed.data
  const row = await createKnowledgeRollup({
    topic,
    language,
    periodStart: new Date(periodStart),
    periodEnd: new Date(periodEnd),
    summaryText,
  })

  return NextResponse.json({ ok: true, rollup: row }, { status: 201 })
}

