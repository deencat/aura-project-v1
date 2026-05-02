import { NextResponse } from "next/server"
import { isInternalCronAuthorized } from "@/lib/internal-cron-auth"
import { executeConciergeRetention } from "@/services/concierge-retention.service"

function retentionTokenSecrets(): string[] {
  return [
    process.env.CONCIERGE_RETENTION_SECRET?.trim(),
    process.env.INTERNAL_CRON_SECRET?.trim(),
  ].filter((s): s is string => Boolean(s))
}

function isAuthorized(req: Request) {
  const tokens = retentionTokenSecrets()
  if (isInternalCronAuthorized(req, tokens)) return true
  const url = new URL(req.url)
  const legacy =
    req.headers.get("x-internal-token")?.trim() || url.searchParams.get("token")?.trim() || ""
  return tokens.some((t) => t === legacy)
}

async function runRetention(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const result = await executeConciergeRetention()
  return NextResponse.json(result)
}

/** Vercel Cron issues GET by default; manual runs may use POST. */
export async function GET(req: Request) {
  return runRetention(req)
}

export async function POST(req: Request) {
  return runRetention(req)
}

