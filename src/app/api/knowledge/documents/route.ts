import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@clerk/nextjs/server"
import { createKnowledgeDocument, listKnowledgeDocuments } from "@/services/knowledge.service"

const createSchema = z.object({
  tier: z.enum(["T0", "T1", "T2", "T3"]).default("T0"),
  status: z.enum(["staging", "active", "archived"]).optional(),
  language: z.string().min(2),
  sourceUrl: z.string().url().optional().nullable(),
  title: z.string().max(200).optional().nullable(),
  publishedAt: z.string().optional().nullable(),
  topics: z.array(z.string()).optional(),
  content: z.string().min(10),
  chunkCharLimit: z.number().int().optional(),
})

export async function GET(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") ?? undefined
  const tier = searchParams.get("tier") ?? undefined
  const language = searchParams.get("language") ?? undefined
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined

  const docs = await listKnowledgeDocuments({
    status: status as any,
    tier: tier as any,
    language: language ?? undefined,
    limit,
  })

  return NextResponse.json({
    ok: true,
    documents: docs.map((d) => ({
      ...d,
      chunkCount: d.chunks.length,
      chunks: undefined,
    })),
  })
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request", message: "Invalid JSON." }, { status: 400 })
  }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_error", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // KB-1 governance: T3 is staging-only unless promoted.
  if (parsed.data.tier === "T3" && parsed.data.status && parsed.data.status !== "staging") {
    return NextResponse.json(
      { ok: false, error: "governance_violation", message: "T3 documents must be created with status=staging." },
      { status: 400 }
    )
  }

  try {
    const result = await createKnowledgeDocument(parsed.data)
    return NextResponse.json({ ok: true, ...result }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "server_error", message: e?.message ?? "Failed to create document." },
      { status: 500 }
    )
  }
}

