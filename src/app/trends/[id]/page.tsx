import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getKnowledgeRollupById } from "@/services/knowledge.service"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const r = await getKnowledgeRollupById(params.id)
    if (!r) return { title: "Trend | Aura" }
    const desc = r.summaryText.replace(/\s+/g, " ").trim().slice(0, 155)
    return {
      title: `${r.topic} | Aura`,
      description: desc || undefined,
    }
  } catch {
    return { title: "Trend | Aura" }
  }
}

export default async function TrendDetailPage({ params }: { params: { id: string } }) {
  let r: Awaited<ReturnType<typeof getKnowledgeRollupById>> = null
  let dbError = false
  try {
    r = await getKnowledgeRollupById(params.id)
  } catch {
    dbError = true
  }
  if (dbError) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          Unable to load this summary (database unavailable). Please try again later.
        </p>
        <p className="mt-6">
          <Link href="/trends" className="text-sm font-medium text-primary hover:underline">
            ← All trends
          </Link>
        </p>
      </div>
    )
  }
  if (!r) notFound()

  const isEn = r.language === "en"
  const isHans = r.language === "zh-Hans"
  const ui = isEn
    ? {
        back: "All trends",
        period: "Period",
        disclaimer:
          "This summary is AI-generated from ingested sources for general information only. It is not medical advice.",
        ask: "Ask the AI concierge",
      }
    : isHans
      ? {
          back: "全部趋势",
          period: "周期",
          disclaimer: "本摘要由素材经 AI 汇总，仅供一般参考，不构成医疗建议。",
          ask: "咨询 AI 礼宾",
        }
      : {
          back: "全部趨勢",
          period: "週期",
          disclaimer: "本摘要由素材經 AI 匯總，僅作一般參考，唔構成醫療建議。",
          ask: "問 AI 禮賓",
        }

  const localeTag =
    r.language === "en" ? "en-HK" : r.language === "zh-Hans" ? "zh-Hans" : "zh-HK"

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <p className="mb-6">
        <Link href={`/trends?lang=${encodeURIComponent(r.language)}`} className="text-sm text-primary hover:underline">
          ← {ui.back}
        </Link>
      </p>
      <article>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{r.topic}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {ui.period}: {new Date(r.periodStart).toLocaleDateString(localeTag)} →{" "}
          {new Date(r.periodEnd).toLocaleDateString(localeTag)}
          <span className="mx-2">·</span>
          {r.language}
        </p>
        <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-gray-800">{r.summaryText}</div>
        <p className="mt-8 text-sm text-gray-600">{ui.disclaimer}</p>
      </article>
      <p className="mt-10">
        <Link href="/concierge" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          {ui.ask}
        </Link>
      </p>
    </div>
  )
}
