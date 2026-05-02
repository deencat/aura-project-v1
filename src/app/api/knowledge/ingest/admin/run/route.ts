import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { runKnowledgeIngest } from "@/services/knowledge-ingest.service"

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const result = await runKnowledgeIngest()
  return NextResponse.json(result)
}

