import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createKnowledgeRollup } from "@/services/knowledge.service"

export type RollupLocale = "zh-HK" | "zh-Hant" | "zh-Hans" | "en"

export const rollupGenerationInputSchema = z.object({
  topic: z.string().min(2).max(60),
  language: z.enum(["zh-HK", "zh-Hant", "zh-Hans", "en"]).default("zh-HK"),
  days: z.number().int().min(3).max(60).default(14),
})

export type RollupGenerationInput = z.infer<typeof rollupGenerationInputSchema>

function summarizerPrompt(language: RollupLocale, topic: string) {
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
  const data: unknown = await res.json().catch(() => ({}))
  const errMsg =
    typeof data === "object" && data !== null && "error" in data
      ? String((data as { error?: { message?: string } }).error?.message ?? "")
      : typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: string }).message ?? "")
        : ""
  if (!res.ok) throw new Error(errMsg || `OpenRouter error (${res.status})`)
  const content =
    typeof data === "object" && data !== null && "choices" in data
      ? (data as { choices?: Array<{ message?: { content?: string } }> }).choices?.[0]?.message?.content
      : undefined
  if (typeof content !== "string" || !content.trim()) throw new Error("Empty rollup response.")
  return content.trim()
}

export type RollupGenerationResult =
  | { ok: true; rollup: Awaited<ReturnType<typeof createKnowledgeRollup>>; sourceCount: number }
  | { ok: false; error: "no_source_docs" | "openrouter"; message: string }

/**
 * Fetch recent T2/T3 active docs, summarize via OpenRouter, persist rollup row.
 */
export async function runKnowledgeRollupGeneration(
  input: RollupGenerationInput,
  deps?: { apiKey?: string; model?: string }
): Promise<RollupGenerationResult> {
  const apiKey = deps?.apiKey ?? process.env.OPENROUTER_API_KEY
  const model = deps?.model ?? (process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini")
  if (!apiKey) {
    return { ok: false, error: "openrouter", message: "OPENROUTER_API_KEY is not set." }
  }

  const { topic, language, days } = input
  const periodEnd = new Date()
  const periodStart = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

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
    return {
      ok: false,
      error: "no_source_docs",
      message: "No recent T2/T3 documents found for this topic/language.",
    }
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

  let summaryText: string
  try {
    summaryText = await callOpenRouter(apiKey, model, summarizerPrompt(language, topic), inputText)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return { ok: false, error: "openrouter", message }
  }

  const row = await createKnowledgeRollup({ topic, language, periodStart, periodEnd, summaryText })
  return { ok: true, rollup: row, sourceCount: docs.length }
}
