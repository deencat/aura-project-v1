import { prisma } from "@/lib/prisma"

export function getConciergeRetentionDays() {
  const raw = Number(process.env.CONCIERGE_RETENTION_DAYS ?? 180)
  return Number.isFinite(raw) && raw > 0 ? raw : 180
}

export type ConciergeRetentionResult = {
  ok: true
  retentionDays: number
  cutoff: string
  deleted: {
    conciergeMessages: number
    conciergeThreads: number
    conciergeRequestEvents: number
    rateLimitCounters: number
  }
}

/**
 * Deletes concierge messages/threads/events older than retention window and stale rate-limit rows.
 * Used by cron routes and Clerk-protected admin trigger.
 */
export async function executeConciergeRetention(): Promise<ConciergeRetentionResult> {
  const days = getConciergeRetentionDays()
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const [messages, threads, events, counters] = await prisma.$transaction([
    prisma.conciergeMessage.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.conciergeThread.deleteMany({ where: { updatedAt: { lt: cutoff } } }),
    prisma.conciergeRequestEvent.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.rateLimitCounter.deleteMany({
      where: { updatedAt: { lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) } },
    }),
  ])

  return {
    ok: true,
    retentionDays: days,
    cutoff: cutoff.toISOString(),
    deleted: {
      conciergeMessages: messages.count,
      conciergeThreads: threads.count,
      conciergeRequestEvents: events.count,
      rateLimitCounters: counters.count,
    },
  }
}
