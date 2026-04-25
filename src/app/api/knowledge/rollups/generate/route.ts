import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createKnowledgeRollup } from "@/services/knowledge.service"

type Locale = "zh-HK" | "zh-Hant" | "zh-Hans" | "en"

const schema = z.object({
  topic: z.string().min(2).max(60),
  language: z.enum(["zh-HK", "zh-Hant", "zh-Hans", "en"]).default("zh-HK"),
  days: z.number().int().min(3).max(60).default(14),
})

function summarizerPrompt(language: Locale, topic: string) {
  if (language === "en") {
    return [
      "You are summarizing beauty/fashion/news documents into a weekly rollup for Hong Kong audiences.",
      `Topic: ${topic}`,
      "Write a concise rollup in bullet points. No medical claims. No guaranteed results. Avoid hype.",
      "Output format:",
      "- 5–8 bullets: what’s trending + why it matters",
      "- 3 bullets: actionable, safe advice for consumers",
      "- 3 bullets: questions to ask a therapist before booking",
    ].join("\n")
  }
  if (language === "zh-Hans") {
    return [
      "你正在把美容/时尚/行业新闻整理成「每周趋势汇总」，面向香港用户。",
      `主题：${topic}`,
      "请用项目符号简洁输出。不要医疗宣称，不要保证效果，避免夸张营销。",
      "输出格式：",
      "- 5–8 条：近期趋势 + 为什么重要",
      "- 3 条：消费者可执行的安全建议",
      "- 3 条：预约前可问治疗师的问题",
    ].join("\n")
  }
  // zh-HK / zh-Hant
  return [
    "你正在把美容/時尚/行業新聞整理成「每週趨勢匯總」，面向香港用戶。",
    `主題：${topic}`,
    "請用項目符號簡潔輸出。唔好作醫療宣稱，唔好保證效果，避免誇張宣傳。",
    "輸出格式：",
    "- 5–8 點：近期趨勢 + 點解重要",
    "- 3 點：消費者可以做嘅安全建議",
    "- 3 點：預約前可以問治療師嘅問題",
  ].join("\n")
}

async function callOpenRouter(apiKey: string, model: string, prompt: string, input: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: input },
      ],
      temperature: 0.4,
      max_tokens: 700,
    }),
  })
  const data: any = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error?.message || data?.message || `OpenRouter error (${res.status})`)
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== "string" || !content.trim()) throw new Error("Empty rollup response.")
  return content.trim()
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini"
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "missing_openrouter_key" }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation_error", issues: parsed.error.flatten() }, { status: 400 })
  }

  const { topic, language, days } = parsed.data
  const periodEnd = new Date()
  const periodStart = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  // Pull recent non-canonical documents as sources for rollups.
  const docs = await prisma.knowledgeDocument.findMany({
    where: {
      tier: { in: ["T2", "T3"] },
      status: "active",
      language,
      OR: [
        { publishedAt: { gte: periodStart } },
        { publishedAt: null, createdAt: { gte: periodStart } },
      ],
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 12,
    include: {
      chunks: { select: { text: true }, take: 3 },
    },
  })

  if (docs.length === 0) {
    return NextResponse.json(
      { ok: false, error: "no_source_docs", message: "No recent T2/T3 documents found for this topic/language." },
      { status: 400 }
    )
  }

  const inputText = [
    `請根據以下資料，整理一份「${topic}」趨勢匯總：`,
    "",
    ...docs.map((d, idx) => {
      const title = d.title || `Doc ${idx + 1}`
      const url = d.sourceUrl ? ` (${d.sourceUrl})` : ""
      const snippet = d.chunks.map((c) => c.text).join("\n\n").slice(0, 2500)
      return `### ${title}${url}\n${snippet}`
    }),
  ].join("\n\n")

  const summaryText = await callOpenRouter(apiKey, model, summarizerPrompt(language, topic), inputText)
  const row = await createKnowledgeRollup({ topic, language, periodStart, periodEnd, summaryText })

  return NextResponse.json({ ok: true, rollup: row, sourceCount: docs.length })
}

