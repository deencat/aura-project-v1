import { NextResponse } from "next/server"
import { runKnowledgeHtmlIngest } from "@/services/knowledge-ingest-html.service"

function getSecret() {
  return (process.env.KB_INGEST_CRON_SECRET || "").trim()
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
}

export async function POST(request: Request) {
  const secret = getSecret()
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "missing_secret", message: "KB_INGEST_CRON_SECRET is not set." },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token") || request.headers.get("x-kb-ingest-secret") || ""
  if (token !== secret) return unauthorized()

  const result = await runKnowledgeHtmlIngest()
  return NextResponse.json(result)
}

