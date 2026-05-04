import { NextResponse } from "next/server"
import { z } from "zod"
import { isInternalCronAuthorized } from "@/lib/internal-cron-auth"
import { archiveOldStagingT3Documents } from "@/services/knowledge.service"

function archiveCronSecrets(): string[] {
  const a = process.env.KB_ARCHIVE_CRON_SECRET?.trim()
  const b = process.env.KB_INGEST_CRON_SECRET?.trim()
  return [a, b].filter((s): s is string => Boolean(s))
}

const inputSchema = z.object({
  olderThanDays: z.number().int().min(1).max(3650).optional(),
})

async function handle(request: Request) {
  const hasVercelCron = Boolean(process.env.CRON_SECRET?.trim())
  const tokenSecrets = archiveCronSecrets()
  if (!hasVercelCron && tokenSecrets.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "missing_secret",
        message: "Set CRON_SECRET (Vercel) and/or KB_ARCHIVE_CRON_SECRET or KB_INGEST_CRON_SECRET for token auth.",
      },
      { status: 500 }
    )
  }

  if (!isInternalCronAuthorized(request, tokenSecrets)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const olderThanDaysRaw = url.searchParams.get("olderThanDays")
  const parsed = inputSchema.safeParse({
    olderThanDays: olderThanDaysRaw ? Number(olderThanDaysRaw) : undefined,
  })
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error" }, { status: 400 })
  }

  const result = await archiveOldStagingT3Documents({ olderThanDays: parsed.data.olderThanDays })
  return NextResponse.json({ ok: true, ...result })
}

export async function GET(request: Request) {
  return handle(request)
}

export async function POST(request: Request) {
  return handle(request)
}

