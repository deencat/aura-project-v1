import { NextResponse } from "next/server"
import { z } from "zod"
import { isInternalCronAuthorized } from "@/lib/internal-cron-auth"
import {
  rollupGenerationInputSchema,
  runKnowledgeRollupGeneration,
  type RollupGenerationInput,
} from "@/services/knowledge-rollup-generation.service"

const cronTopicSchema = z.object({
  topic: z.string().min(2).max(60),
  language: rollupGenerationInputSchema.shape.language.optional(),
  days: rollupGenerationInputSchema.shape.days.optional(),
})

const cronTopicsListSchema = z.array(cronTopicSchema).min(1).max(12)

function defaultTopics(): RollupGenerationInput[] {
  return [{ topic: "香港美容趨勢", language: "zh-HK", days: 14 }]
}

function parseTopicsFromEnv(): RollupGenerationInput[] {
  const raw = process.env.KB_ROLLUP_TOPICS_JSON?.trim()
  if (!raw) return defaultTopics()
  let parsed: unknown
  try {
    parsed = JSON.parse(raw) as unknown
  } catch {
    return defaultTopics()
  }
  const checked = cronTopicsListSchema.safeParse(parsed)
  if (!checked.success) return defaultTopics()
  return checked.data.map((row) => ({
    topic: row.topic,
    language: row.language ?? "zh-HK",
    days: row.days ?? 14,
  }))
}

function rollupCronSecrets(): string[] {
  const a = process.env.KB_ROLLUP_CRON_SECRET?.trim()
  const b = process.env.KB_INGEST_CRON_SECRET?.trim()
  return [a, b].filter((s): s is string => Boolean(s))
}

/** Vercel Cron uses GET; external jobs may POST. */
async function handle(request: Request) {
  const hasVercelCron = Boolean(process.env.CRON_SECRET?.trim())
  const tokenSecrets = rollupCronSecrets()
  if (!hasVercelCron && tokenSecrets.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "missing_secret",
        message: "Set CRON_SECRET (Vercel) and/or KB_ROLLUP_CRON_SECRET or KB_INGEST_CRON_SECRET for token auth.",
      },
      { status: 500 }
    )
  }

  if (!isInternalCronAuthorized(request, tokenSecrets)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const topics = parseTopicsFromEnv()
  const results: Array<
    | { topic: string; language: string; ok: true; rollupId: string; sourceCount: number }
    | { topic: string; language: string; ok: false; error: string; message: string }
  > = []

  for (const t of topics) {
    const result = await runKnowledgeRollupGeneration(t)
    if (result.ok) {
      results.push({
        topic: t.topic,
        language: t.language,
        ok: true,
        rollupId: result.rollup.id,
        sourceCount: result.sourceCount,
      })
    } else {
      results.push({
        topic: t.topic,
        language: t.language,
        ok: false,
        error: result.error,
        message: result.message,
      })
    }
  }

  const anyOk = results.some((r) => r.ok)
  const payload = {
    ok: anyOk,
    topicsAttempted: topics.length,
    results,
  }
  return NextResponse.json(payload, { status: anyOk ? 200 : 503 })
}

export async function GET(request: Request) {
  return handle(request)
}

export async function POST(request: Request) {
  return handle(request)
}
