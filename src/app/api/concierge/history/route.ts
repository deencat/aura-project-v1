import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { enforceConciergeRateLimit, logConciergeRequestEvent } from "@/services/concierge-guard.service"

type Locale = "zh-HK" | "zh-Hans" | "en"

function getLocaleFromUrl(req: Request): Locale {
  const url = new URL(req.url)
  const raw = url.searchParams.get("locale") ?? "zh-HK"
  if (raw === "en" || raw === "zh-Hans" || raw === "zh-HK") return raw
  return "zh-HK"
}

async function getOrCreateLatestThread(userId: string, locale: Locale) {
  const existing = await prisma.conciergeThread.findFirst({
    where: { userId, locale },
    orderBy: { updatedAt: "desc" },
    select: { id: true },
  })

  if (existing?.id) return existing.id

  const created = await prisma.conciergeThread.create({
    data: { userId, locale },
    select: { id: true },
  })
  return created.id
}

export async function GET(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const locale = getLocaleFromUrl(req)
  const { decision, ipHash } = await enforceConciergeRateLimit({
    request: req,
    route: "/api/concierge/history",
    method: "GET",
    userId,
    locale,
  })
  if (!decision.ok) {
    await logConciergeRequestEvent({
      route: "/api/concierge/history",
      method: "GET",
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

  const threadId = await getOrCreateLatestThread(userId, locale)

  const messages = await prisma.conciergeMessage.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
    take: 200,
    select: {
      id: true,
      role: true,
      content: true,
      sources: true,
      rollupSources: true,
      createdAt: true,
    },
  })

  return NextResponse.json({
    ok: true,
    threadId,
    messages: messages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      sources: m.sources ?? undefined,
      rollupSources: m.rollupSources ?? undefined,
      createdAt: m.createdAt.toISOString(),
    })),
  })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const localeRaw = body?.locale
  const locale: Locale =
    localeRaw === "en" || localeRaw === "zh-Hans" || localeRaw === "zh-HK" ? localeRaw : "zh-HK"

  const { decision, ipHash } = await enforceConciergeRateLimit({
    request: req,
    route: "/api/concierge/history",
    method: "POST",
    userId,
    locale,
  })
  if (!decision.ok) {
    await logConciergeRequestEvent({
      route: "/api/concierge/history",
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

  const threadId: string = body?.threadId ?? (await getOrCreateLatestThread(userId, locale))
  const messages: unknown = body?.messages

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const cleaned = messages
    .map((m) => ({
      role: typeof m?.role === "string" ? m.role : "",
      content: typeof m?.content === "string" ? m.content : "",
      sources: m?.sources ?? undefined,
      rollupSources: m?.rollupSources ?? undefined,
    }))
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content.trim().length > 0)

  if (cleaned.length === 0) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  // Ensure this thread belongs to the user.
  const thread = await prisma.conciergeThread.findFirst({
    where: { id: threadId, userId, locale },
    select: { id: true },
  })
  const safeThreadId = thread?.id ?? (await getOrCreateLatestThread(userId, locale))

  await prisma.$transaction([
    prisma.conciergeThread.update({
      where: { id: safeThreadId },
      data: { updatedAt: new Date() },
    }),
    prisma.conciergeMessage.createMany({
      data: cleaned.map((m) => ({
        threadId: safeThreadId,
        role: m.role,
        content: m.content,
        sources: m.sources,
        rollupSources: m.rollupSources,
      })),
    }),
  ])

  await logConciergeRequestEvent({
    route: "/api/concierge/history",
    method: "POST",
    locale,
    ipHash,
    userId,
    statusCode: 200,
    rateLimited: false,
  })

  return NextResponse.json({ ok: true, threadId: safeThreadId })
}

