import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { runKnowledgeHtmlIngest } from "@/services/knowledge-ingest-html.service"

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const result = await runKnowledgeHtmlIngest()
  return NextResponse.json(result)
}

