import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import {
  deleteKnowledgeDocument,
  getKnowledgeDocumentById,
  updateKnowledgeDocument,
} from "@/services/knowledge.service"

const patchSchema = z.object({
  tier: z.enum(["T0", "T1", "T2", "T3"]).optional(),
  status: z.enum(["staging", "active", "archived"]).optional(),
  language: z.string().min(2).max(20).optional(),
  sourceUrl: z.string().url().optional().nullable(),
  title: z.string().max(200).optional().nullable(),
  publishedAt: z.string().optional().nullable(),
  topics: z.array(z.string()).optional(),
  content: z.string().min(10).optional(),
  chunkCharLimit: z.number().int().optional(),
})

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const id = ctx.params.id
  const doc = await getKnowledgeDocumentById(id)
  if (!doc) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 })

  return NextResponse.json({ ok: true, document: doc })
}

export async function PATCH(request: Request, ctx: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request", message: "Invalid JSON." }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error", issues: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const updated = await updateKnowledgeDocument({ id: ctx.params.id, ...parsed.data })
    return NextResponse.json({ ok: true, ...updated })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "server_error", message: e?.message ?? "Failed to update document." },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, ctx: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  try {
    await deleteKnowledgeDocument({ id: ctx.params.id })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "server_error", message: e?.message ?? "Failed to delete document." },
      { status: 500 }
    )
  }
}

