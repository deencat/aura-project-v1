import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isInternalCronAuthorized } from "@/lib/internal-cron-auth"

function retentionTokenSecrets(): string[] {
  return [
    process.env.CONCIERGE_RETENTION_SECRET?.trim(),
    process.env.INTERNAL_CRON_SECRET?.trim(),
  ].filter((s): s is string => Boolean(s))
}

function getRetentionDays() {
  const raw = Number(process.env.CONCIERGE_RETENTION_DAYS ?? 180)
  return Number.isFinite(raw) && raw > 0 ? raw : 180
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

  const days = getRetentionDays()
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const [messages, threads, events, counters] = await prisma.$transaction([
    prisma.conciergeMessage.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.conciergeThread.deleteMany({ where: { updatedAt: { lt: cutoff } } }),
    prisma.conciergeRequestEvent.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.rateLimitCounter.deleteMany({
      // Keep only recent limiter windows. 3 days is enough for debugging/abuse review.
      where: { updatedAt: { lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) } },
    }),
  ])

  return NextResponse.json({
    ok: true,
    retentionDays: days,
    cutoff: cutoff.toISOString(),
    deleted: {
      conciergeMessages: messages.count,
      conciergeThreads: threads.count,
      conciergeRequestEvents: events.count,
      rateLimitCounters: counters.count,
    },
  })
}

/** Vercel Cron issues GET by default; manual runs may use POST. */
export async function GET(req: Request) {
  return runRetention(req)
}

export async function POST(req: Request) {
  return runRetention(req)
}

