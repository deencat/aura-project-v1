import { NextResponse } from "next/server"

type Locale = "zh-HK" | "en" | "zh-Hans" | "zh-Hant"

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown"
  return request.headers.get("x-real-ip") ?? "unknown"
}

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20
const rateLimitState = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string) {
  const now = Date.now()
  const existing = rateLimitState.get(ip)
  if (!existing || now >= existing.resetAt) {
    rateLimitState.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 }
  }
  if (existing.count >= RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) }
  }
  existing.count += 1
  rateLimitState.set(ip, existing)
  return { ok: true, remaining: RATE_LIMIT_MAX - existing.count }
}

function normalizeLocale(locale: unknown): Locale {
  if (locale === "zh-HK" || locale === "en" || locale === "zh-Hans" || locale === "zh-Hant") return locale
  return "zh-HK"
}

function getCopy(locale: Locale) {
  // Note: we treat `zh-Hant` as a close Traditional fallback, but default stays `zh-HK`.
  const isTc = locale === "zh-HK" || locale === "zh-Hant"
  const isSc = locale === "zh-Hans"

  if (isTc) {
    return {
      greeting:
        "你好，我係 Aura 美容 AI 禮賓。我可以幫你用最少問題了解需要，並推薦合適療程／提供術前術後注意事項。你想改善咩問題？（例：暗瘡、色斑、毛孔、緊緻、敏感）",
      disclaimer:
        "提示：我提供嘅內容只作一般資訊，唔係醫療診斷。如你有懷孕、皮膚病、嚴重敏感或正在服藥，建議先同治療師／醫生確認。",
      askFollowUps: "想我問你 3 條問題，幫你更準確配對療程嗎？",
      booking:
        "如果你想快啲預約，我可以幫你整理重點，再帶你去聯絡頁面／WhatsApp。",
      quickReplies: {
        hydration: "想保濕 / 乾燥",
        pigment: "想淡斑 / 提亮",
        calming: "想舒緩 / 降紅",
        pore: "想收毛孔 / 嫩膚",
      },
      ctaContact: "去聯絡 / 預約",
      ctaTreatments: "睇療程",
    }
  }

  if (isSc) {
    return {
      greeting:
        "你好，我是 Aura 美容 AI 礼宾。我可以用最少问题了解你的需求，并推荐合适疗程／提供术前术后注意事项。你想改善什么问题？（例：痘痘、色斑、毛孔、紧致、敏感）",
      disclaimer:
        "提示：我提供的内容仅作一般信息，不构成医疗诊断。如你怀孕、皮肤病、严重敏感或正在用药，建议先与治疗师／医生确认。",
      askFollowUps: "要不要我问你 3 个问题，帮你更准确匹配疗程？",
      booking: "如果你想快速预约，我可以先帮你整理重点，再带你去联系页面／WhatsApp。",
      quickReplies: {
        hydration: "想补水 / 干燥",
        pigment: "想淡斑 / 提亮",
        calming: "想舒缓 / 泛红",
        pore: "想收毛孔 / 嫩肤",
      },
      ctaContact: "去联系 / 预约",
      ctaTreatments: "看疗程",
    }
  }

  return {
    greeting:
      "Hi — I’m Aura’s Beauty AI concierge. Tell me what you’d like to improve (e.g. acne, pigmentation, pores, lifting, sensitivity) and I’ll suggest suitable treatments and aftercare tips.",
    disclaimer:
      "Note: This is general information, not medical advice. If you’re pregnant, have skin conditions, severe allergies, or are on medication, please confirm with a therapist/doctor first.",
    askFollowUps: "Want me to ask 3 quick questions to match you more accurately?",
    booking:
      "If you want to book quickly, I can summarize your needs and send you to the contact/WhatsApp page.",
    quickReplies: {
      hydration: "Hydration / dryness",
      pigment: "Brightening / pigmentation",
      calming: "Calming / redness",
      pore: "Pores / smoothing",
    },
    ctaContact: "Contact / Book",
    ctaTreatments: "Browse treatments",
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rl = rateLimit(ip)
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSeconds ?? 60),
        },
      }
    )
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "bad_request", message: "Invalid JSON body." }, { status: 400 })
  }

  const locale = normalizeLocale(body?.locale)
  const message = typeof body?.message === "string" ? body.message.trim() : ""
  const copy = getCopy(locale)

  // Stub logic: we only provide safe, guided, short responses and link to next steps.
  const links = {
    treatments: "/treatments",
    contact: "/contact",
  }

  const responseText =
    message.length === 0
      ? `${copy.greeting}\n\n${copy.disclaimer}`
      : `${copy.askFollowUps}\n\n- 你係想改善邊個位置？（面／眼周／頸／身體）\n- 你最介意：效果、停工期、敏感反應，定係價錢？\n- 最近 2 週有無做過去角質／換膚／醫美？\n\n${copy.booking}\n\n${copy.disclaimer}`

  return NextResponse.json(
    {
      ok: true,
      locale,
      reply: responseText,
      quickReplies: copy.quickReplies,
      links,
    },
    {
      headers: {
        "X-RateLimit-Remaining": String(rl.remaining ?? 0),
      },
    }
  )
}

