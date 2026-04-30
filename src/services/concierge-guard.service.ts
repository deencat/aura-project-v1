import crypto from "crypto"
import { prisma } from "@/lib/prisma"

export type ConciergeRateLimitDecision =
  | { ok: true; remaining: number; windowSeconds: number }
  | { ok: false; retryAfterSeconds: number; windowSeconds: number }

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown"
  return request.headers.get("x-real-ip") ?? "unknown"
}

function getHashSalt() {
  return process.env.LOG_HASH_SALT || process.env.CONCIERGE_LOG_HASH_SALT || "dev"
}

export function hashIp(ip: string) {
  return crypto.createHash("sha256").update(`${getHashSalt()}:${ip}`).digest("hex")
}

export function getRateLimitConfig() {
  const windowSeconds = Number(process.env.CONCIERGE_RATE_LIMIT_WINDOW_SECONDS ?? 60)
  const maxPerWindow = Number(process.env.CONCIERGE_RATE_LIMIT_MAX ?? 20)
  const maxPerUserPerWindow = Number(process.env.CONCIERGE_RATE_LIMIT_USER_MAX ?? 30)
  return {
    windowSeconds: Number.isFinite(windowSeconds) && windowSeconds > 0 ? windowSeconds : 60,
    maxPerWindow: Number.isFinite(maxPerWindow) && maxPerWindow > 0 ? maxPerWindow : 20,
    maxPerUserPerWindow:
      Number.isFinite(maxPerUserPerWindow) && maxPerUserPerWindow > 0 ? maxPerUserPerWindow : 30,
  }
}

export async function enforceConciergeRateLimit(args: {
  request: Request
  route: string
  method: string
  userId?: string | null
  locale?: string | null
}): Promise<{ decision: ConciergeRateLimitDecision; ipHash: string; ip: string }> {
  const { windowSeconds, maxPerWindow, maxPerUserPerWindow } = getRateLimitConfig()
  const windowMs = windowSeconds * 1000
  const windowId = Math.floor(Date.now() / windowMs)

  const ip = getClientIp(args.request)
  const ipHash = hashIp(ip)

  const keys: { key: string; max: number }[] = [{ key: `ip:${ipHash}:${args.route}`, max: maxPerWindow }]
  if (args.userId) keys.push({ key: `user:${args.userId}:${args.route}`, max: maxPerUserPerWindow })

  const results = await prisma.$transaction(
    keys.map((k) =>
      prisma.rateLimitCounter.upsert({
        where: { key_windowId: { key: k.key, windowId } },
        create: { key: k.key, windowId, count: 1 },
        update: { count: { increment: 1 } },
        select: { count: true },
      })
    )
  )

  let worstRetry = 0
  for (let i = 0; i < keys.length; i++) {
    const max = keys[i]!.max
    const count = results[i]!.count
    if (count > max) {
      const now = Date.now()
      const resetAt = (windowId + 1) * windowMs
      const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000))
      worstRetry = Math.max(worstRetry, retryAfterSeconds)
    }
  }

  if (worstRetry > 0) {
    return { decision: { ok: false, retryAfterSeconds: worstRetry, windowSeconds }, ipHash, ip }
  }

  // Remaining based on the strictest key (route-level).
  const remaining = Math.max(0, maxPerWindow - results[0]!.count)
  return { decision: { ok: true, remaining, windowSeconds }, ipHash, ip }
}

export async function logConciergeRequestEvent(args: {
  route: string
  method: string
  locale?: string | null
  ipHash: string
  userId?: string | null
  statusCode: number
  rateLimited: boolean
}) {
  // Intentionally do not store message content or raw IP.
  await prisma.conciergeRequestEvent.create({
    data: {
      route: args.route,
      method: args.method,
      locale: args.locale ?? undefined,
      ipHash: args.ipHash,
      userId: args.userId ?? undefined,
      statusCode: args.statusCode,
      rateLimited: args.rateLimited,
    },
    select: { id: true },
  })
}

