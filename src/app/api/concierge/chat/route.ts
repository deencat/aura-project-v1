import { NextResponse } from "next/server"
import { retrieveKnowledgeChunks } from "@/services/knowledge.service"

type Locale = "zh-HK" | "en" | "zh-Hans" | "zh-Hant"
type OpenRouterMessage = { role: "system" | "user" | "assistant"; content: string }

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
  return (process.env.DEFAULT_CHAT_LOCALE as Locale) || "zh-HK"
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

function getSystemPrompt(locale: Locale) {
  // Keep it short and operational. Long “brand manifestos” reduce quality and increase hallucination risk.
  if (locale === "zh-Hans") {
    return [
      "你是 Aura（香港美容中心）的美容 AI 礼宾。默认用简体中文回答，除非用户使用英文或明确要求繁体。",
      "目标：用最少问题理解用户需求，给出 2–3 个可能的疗程方向/注意事项，并引导到“疗程页/联系页”预约。",
      "安全边界：不做医疗诊断；不做处方/用药建议；不承诺治疗效果；涉及怀孕、皮肤病、严重过敏、出血/感染风险、正在用药等，必须建议先与治疗师/医生确认并提供人工转介。",
      "若提供了【Aura 知识库】内容：优先依据其信息；不要编造未出现的价格、机器型号、承诺。",
      "风格：温柔、专业、简洁；先问澄清问题，再给建议。必要时用项目符号。",
    ].join("\n")
  }

  if (locale === "en") {
    return [
      "You are Aura’s Beauty AI concierge (Hong Kong). Reply in English unless the user writes Chinese.",
      "Goal: understand needs with minimal questions, suggest 2–3 plausible treatment directions and aftercare notes, and guide to booking links (treatments/contact).",
      "Safety: no medical diagnosis; no prescriptions/medication advice; no guaranteed outcomes. If pregnancy, skin disease, severe allergy, infection/bleeding risk, or medication is mentioned, advise human clinician/therapist confirmation and offer handoff.",
      "If you are given 【Aura Knowledge Base】 context: prioritize it; do not invent prices, device models, or guarantees not present.",
      "Style: warm, professional, concise. Ask clarifying questions before recommending.",
    ].join("\n")
  }

  // zh-HK / zh-Hant default
  return [
    "你係 Aura（香港美容中心）嘅美容 AI 禮賓。預設用香港常用繁體中文（zh-HK）回答，除非用戶用英文或明確要求簡體/英文。",
    "目標：用最少問題了解需要，提供 2–3 個可能療程方向/注意事項，並引導去「療程頁/聯絡頁」完成預約。",
    "安全界線：唔做醫療診斷；唔提供處方/用藥建議；唔保證療效。提到懷孕、皮膚病、嚴重敏感、出血/感染風險、正在服藥等，必須建議先同治療師/醫生確認，並提供人工轉介。",
    "如有提供【Aura 知識庫】內容：優先以該資料為準；唔好作出未出現嘅價錢、機種型號或承諾。",
    "語氣：溫柔、專業、簡潔；先問澄清問題，再俾建議；必要時用項目符號。",
  ].join("\n")
}

function getLocaleNote(locale: Locale) {
  if (locale === "zh-Hans") return "请用简体中文回答。"
  if (locale === "en") return "Please reply in English."
  return "請用香港常用繁體中文回答。"
}

function getStubResponse(locale: Locale, message: string) {
  const copy = getCopy(locale)
  const links = {
    treatments: "/treatments",
    contact: "/contact",
  }

  const responseText =
    message.length === 0
      ? `${copy.greeting}\n\n${copy.disclaimer}`
      : `${copy.askFollowUps}\n\n- 你係想改善邊個位置？（面／眼周／頸／身體）\n- 你最介意：效果、停工期、敏感反應，定係價錢？\n- 最近 2 週有無做過去角質／換膚／醫美？\n\n${copy.booking}\n\n${copy.disclaimer}`

  return {
    ok: true,
    locale,
    reply: responseText,
    quickReplies: copy.quickReplies,
    links,
    mode: "stub" as const,
  }
}

function formatKbContext(args: { locale: Locale; chunks: any[] }) {
  const maxChars = 5500
  let used = 0
  const lines: string[] = []
  for (const c of args.chunks) {
    const title = c.document?.title || "Untitled"
    const lang = c.document?.language || "unknown"
    const tier = c.document?.tier || "T0"
    const url = c.document?.sourceUrl || ""
    const header = `- [${tier}] (${lang}) ${title}${url ? ` — ${url}` : ""}`
    const body = String(c.text ?? "").trim()
    const block = `${header}\n${body}\n`
    if (used + block.length > maxChars) break
    used += block.length
    lines.push(block)
  }
  if (lines.length === 0) return ""

  const lead =
    args.locale === "en"
      ? "【Aura Knowledge Base (canonical salon facts)】\nUse this context as the highest-priority source.\n"
      : args.locale === "zh-Hans"
        ? "【Aura 知识库（官方/权威内容）】\n请优先依据以下内容作答。\n"
        : "【Aura 知識庫（官方/權威內容）】\n請優先根據以下內容作答。\n"

  return `${lead}\n${lines.join("\n")}`
}

async function callOpenRouter(args: {
  apiKey: string
  model: string
  locale: Locale
  userMessage: string
  kbContext?: string
}) {
  const { apiKey, model, locale, userMessage, kbContext } = args

  const messages: OpenRouterMessage[] = [
    { role: "system", content: getSystemPrompt(locale) },
    ...(kbContext ? [{ role: "system" as const, content: kbContext }] : []),
    { role: "user", content: `${getLocaleNote(locale)}\n\n${userMessage}` },
  ]

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional but recommended by OpenRouter for attribution/analytics
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 500,
    }),
  })

  const data: any = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error?.message || data?.message || `OpenRouter error (${res.status})`
    throw new Error(msg)
  }

  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== "string" || content.trim().length === 0) {
    throw new Error("Empty response from model.")
  }
  return content.trim()
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
  const openRouterKey = process.env.OPENROUTER_API_KEY
  const openRouterModel = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini"

  // For the initial greeting boot call (`message === ""`), keep the stub greeting.
  // This makes the first paint fast and predictable even if the model is slow.
  if (!message) {
    return NextResponse.json(getStubResponse(locale, ""), {
      headers: { "X-RateLimit-Remaining": String(rl.remaining ?? 0) },
    })
  }

  // If no key is configured, keep using the stub (safe local mode).
  if (!openRouterKey) {
    return NextResponse.json(getStubResponse(locale, message), {
      headers: { "X-RateLimit-Remaining": String(rl.remaining ?? 0) },
    })
  }

  try {
    let kbContext = ""
    let kbHits = 0
    try {
      const chunks = await retrieveKnowledgeChunks({
        query: message,
        locale,
        tier: "T0",
        status: "active",
        limit: 8,
      })
      kbHits = chunks.length
      kbContext = formatKbContext({ locale, chunks })
    } catch {
      // If DB is unavailable, proceed without KB context.
      kbContext = ""
      kbHits = 0
    }

    const reply = await callOpenRouter({
      apiKey: openRouterKey,
      model: openRouterModel,
      locale,
      userMessage: message,
      kbContext,
    })

    const copy = getCopy(locale)
    const links = { treatments: "/treatments", contact: "/contact" }

    return NextResponse.json(
      {
        ok: true,
        locale,
        reply,
        quickReplies: copy.quickReplies,
        links,
        mode: "openrouter",
        model: openRouterModel,
        kbHits,
      },
      { headers: { "X-RateLimit-Remaining": String(rl.remaining ?? 0) } }
    )
  } catch (e: any) {
    // Fail safe: if OpenRouter errors, degrade to stub with a gentle hint.
    const stub = getStubResponse(locale, message)
    const hint =
      locale === "en"
        ? "\n\n(Temporary: AI service is busy. Here’s a guided flow while we retry.)"
        : locale === "zh-Hans"
          ? "\n\n（临时：AI 服务繁忙。先用这个引导流程，我们稍后再试。）"
          : "\n\n（暫時：AI 服務繁忙。先用呢個引導流程，我哋稍後再試。）"
    return NextResponse.json(
      { ...stub, reply: `${stub.reply}${hint}` },
      { headers: { "X-RateLimit-Remaining": String(rl.remaining ?? 0) } }
    )
  }
}

