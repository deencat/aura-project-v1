import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import {
  transcribeAudioWithOpenAIWhisper,
  type ConciergeTranscribeLocale,
} from "@/services/concierge-transcribe.service"
import { enforceConciergeRateLimit, logConciergeRequestEvent } from "@/services/concierge-guard.service"

export const maxDuration = 60

const ROUTE = "/api/concierge/transcribe"

function maxBytes() {
  const n = Number(process.env.CONCIERGE_TRANSCRIBE_MAX_BYTES ?? 8_000_000)
  return Number.isFinite(n) && n > 0 ? n : 8_000_000
}

function parseLocale(raw: string | null): ConciergeTranscribeLocale {
  if (raw === "en" || raw === "zh-Hans") return raw
  return "zh-HK"
}

export async function POST(request: Request) {
  const { userId } = await auth()

  const { decision, ipHash } = await enforceConciergeRateLimit({
    request,
    route: ROUTE,
    method: "POST",
    userId,
    locale: null,
  })

  if (!decision.ok) {
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
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

  if (!process.env.OPENAI_API_KEY?.trim()) {
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
      ipHash,
      userId,
      statusCode: 503,
      rateLimited: false,
    })
    return NextResponse.json(
      {
        ok: false,
        error: "stt_not_configured",
        message: "Server transcription is not configured. Add OPENAI_API_KEY for Whisper.",
      },
      { status: 503 }
    )
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
      ipHash,
      userId,
      statusCode: 400,
      rateLimited: false,
    })
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const file = form.get("audio")
  if (!(file instanceof File)) {
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
      ipHash,
      userId,
      statusCode: 400,
      rateLimited: false,
    })
    return NextResponse.json({ ok: false, error: "missing_audio" }, { status: 400 })
  }

  const locale = parseLocale(typeof form.get("locale") === "string" ? (form.get("locale") as string) : null)

  if (file.size > maxBytes()) {
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
      ipHash,
      userId,
      statusCode: 413,
      rateLimited: false,
    })
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 })
  }

  try {
    const { text } = await transcribeAudioWithOpenAIWhisper({ file, locale })
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
      locale,
      ipHash,
      userId,
      statusCode: 200,
      rateLimited: false,
    })
    return NextResponse.json(
      { ok: true, text, locale },
      { headers: { "X-RateLimit-Remaining": String(decision.remaining) } }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : "transcription_failed"
    await logConciergeRequestEvent({
      route: ROUTE,
      method: "POST",
      locale,
      ipHash,
      userId,
      statusCode: 502,
      rateLimited: false,
    })
    return NextResponse.json({ ok: false, error: "transcription_failed", message }, { status: 502 })
  }
}
