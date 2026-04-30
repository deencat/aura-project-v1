import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { enforceConciergeRateLimit, logConciergeRequestEvent } from "@/services/concierge-guard.service"

type Locale = "zh-HK" | "zh-Hans" | "en"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const localeRaw = body?.locale
  const locale: Locale =
    localeRaw === "en" || localeRaw === "zh-Hans" || localeRaw === "zh-HK" ? localeRaw : "zh-HK"

  const { decision, ipHash } = await enforceConciergeRateLimit({
    request: req,
    route: "/api/concierge/history/new",
    method: "POST",
    userId,
    locale,
  })
  if (!decision.ok) {
    await logConciergeRequestEvent({
      route: "/api/concierge/history/new",
      method: "POST",
      locale,
      ipHash,
      userId,
      statusCode: 429,
      rateLimited: true,
    })
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfterSeconds: decision.retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(decision.retryAfterSeconds) } }
    )
  }

  const thread = await prisma.conciergeThread.create({
    data: { userId, locale },
    select: { id: true },
  })

  await logConciergeRequestEvent({
    route: "/api/concierge/history/new",
    method: "POST",
    locale,
    ipHash,
    userId,
    statusCode: 200,
    rateLimited: false,
  })

  return NextResponse.json({ ok: true, threadId: thread.id })
}

