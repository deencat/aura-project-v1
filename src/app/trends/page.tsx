import { type Metadata } from "next"
import Link from "next/link"
import { listKnowledgeRollups } from "@/services/knowledge.service"

/** Static metadata: Next.js 14 `generateMetadata` does not receive `searchParams` reliably for this route. */
export const metadata: Metadata = {
  title: "美容趨勢摘要 · Beauty trends | Aura",
  description:
    "AI-generated beauty trend summaries from the knowledge bank (informational only, not medical advice).",
}

const LANGS = ["zh-HK", "en", "zh-Hans", "zh-Hant"] as const

function normalizeLang(raw: string | undefined): (typeof LANGS)[number] {
  if (raw === "en" || raw === "zh-Hans" || raw === "zh-Hant") return raw
  return "zh-HK"
}

export default async function TrendsIndexPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const sp = searchParams ?? {}
  const lang = normalizeLang(typeof sp.lang === "string" ? sp.lang : undefined)
  let rollups: Awaited<ReturnType<typeof listKnowledgeRollups>> = []
  let dbUnavailable = false
  try {
    rollups = await listKnowledgeRollups({ language: lang, limit: 40 })
  } catch {
    dbUnavailable = true
  }

  const ui =
    lang === "en"
      ? {
          h1: "Beauty trend summaries",
          intro:
            "These are short summaries generated from curated and ingested sources. They are informational only—not medical advice. For personal concerns, contact us or speak with a professional.",
          empty: "No summaries for this language yet. Check back after the next rollup run, or try another language below.",
          dbError: "We couldn’t load summaries right now (database unavailable). Please try again later.",
          period: "Period",
          askConcierge: "Ask the AI concierge",
          langLabel: "Language",
        }
      : lang === "zh-Hans"
        ? {
            h1: "美容趋势摘要",
            intro:
              "以下内容由知识库素材经 AI 汇总生成，仅供一般信息参考，不构成医疗诊断或治疗建议。如有个人情况，请联系我们或咨询专业人士。",
            empty: "该语言暂无摘要。可稍后再试或切换其他语言。",
            dbError: "暂时无法加载摘要（数据库不可用），请稍后再试。",
            period: "周期",
            askConcierge: "咨询 AI 礼宾",
            langLabel: "语言",
          }
        : {
            h1: "美容趨勢摘要",
            intro:
              "以下內容由知識庫素材經 AI 匯總生成，僅作一般資訊參考，唔構成醫療診斷或治療建議。如有個人情況，請聯絡我哋或諮詢專業人士。",
            empty: "此語言暫未有摘要。可稍後再試或轉其他語言。",
            dbError: "暫時無法載入摘要（資料庫未能連線），請稍後再試。",
            period: "週期",
            askConcierge: "問 AI 禮賓",
            langLabel: "語言",
          }

  const localeTag = lang === "en" ? "en-HK" : lang === "zh-Hans" ? "zh-Hans" : "zh-HK"

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{ui.h1}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{ui.intro}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">{ui.langLabel}:</span>
          {LANGS.map((l) => (
            <Link
              key={l}
              href={`/trends?lang=${l}`}
              className={
                l === lang
                  ? "rounded-full bg-primary/15 px-3 py-1 font-medium text-primary"
                  : "rounded-full px-3 py-1 text-gray-600 hover:bg-gray-100"
              }
            >
              {l}
            </Link>
          ))}
        </div>
      </div>

      {dbUnavailable ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 shadow-sm">{ui.dbError}</p>
      ) : rollups.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">{ui.empty}</p>
      ) : (
        <ul className="space-y-4">
          {rollups.map((r) => (
            <li key={r.id}>
              <Link
                href={`/trends/${r.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{r.topic}</h2>
                  <span className="text-xs text-gray-500">
                    {ui.period}: {new Date(r.periodStart).toLocaleDateString(localeTag)} →{" "}
                    {new Date(r.periodEnd).toLocaleDateString(localeTag)}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{r.summaryText}</p>
                <span className="mt-3 inline-block text-sm font-medium text-primary">
                  {lang === "en" ? "Read more →" : lang === "zh-Hans" ? "阅读全文 →" : "閱讀全文 →"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-center">
        <Link href="/concierge" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          {ui.askConcierge}
        </Link>
      </p>
    </div>
  )
}
