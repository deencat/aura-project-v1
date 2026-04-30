import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function getRetentionSecret() {
  return process.env.CONCIERGE_RETENTION_SECRET || process.env.INTERNAL_CRON_SECRET || ""
}

function getRetentionDays() {
  const raw = Number(process.env.CONCIERGE_RETENTION_DAYS ?? 90)
  return Number.isFinite(raw) && raw > 0 ? raw : 90
}

function isAuthorized(req: Request) {
  const secret = getRetentionSecret()
  if (!secret) return false

  const url = new URL(req.url)
  const token = req.headers.get("x-internal-token") || url.searchParams.get("token") || ""
  return token === secret
}

export async function POST(req: Request) {
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

