import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { rollupGenerationInputSchema, runKnowledgeRollupGeneration } from "@/services/knowledge-rollup-generation.service"

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const parsed = rollupGenerationInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error", issues: parsed.error.flatten() }, { status: 400 })
  }

  const result = await runKnowledgeRollupGeneration(parsed.data)
  if (!result.ok) {
    if (result.error === "no_source_docs") {
      return NextResponse.json(
        { ok: false, error: "no_source_docs", message: result.message },
        { status: 400 }
      )
    }
    return NextResponse.json({ ok: false, error: "rollup_failed", message: result.message }, { status: 502 })
  }

  return NextResponse.json({ ok: true, rollup: result.rollup, sourceCount: result.sourceCount })
}
