/**
 * Voice-1: server STT.
 * - Prefer OPENAI_API_KEY → OpenAI Whisper (multipart upload).
 * - Else OPENROUTER_API_KEY → OpenRouter POST /api/v1/audio/transcriptions (base64 JSON).
 * Audio is not stored in Aura; forwarded only for transcription.
 */

export type ConciergeTranscribeLocale = "zh-HK" | "en" | "zh-Hans"

/** Whisper / STT `language` is ISO-639-1; `zh` covers Chinese audio (Cantonese/Mandarin). */
export function whisperLanguageForLocale(locale: ConciergeTranscribeLocale): string {
  if (locale === "en") return "en"
  return "zh"
}

function sttFormatFromFile(file: File): string {
  const name = (file.name || "").toLowerCase()
  if (name.endsWith(".webm")) return "webm"
  if (name.endsWith(".mp4")) return "m4a"
  if (name.endsWith(".m4a")) return "m4a"
  if (name.endsWith(".aac")) return "aac"
  if (name.endsWith(".mp3")) return "mp3"
  const t = (file.type || "").toLowerCase()
  if (t.includes("webm")) return "webm"
  if (t.includes("mp4")) return "m4a"
  if (t.includes("aac")) return "aac"
  if (t.includes("mpeg")) return "mp3"
  return "webm"
}

export async function transcribeAudioWithOpenAIWhisper(args: {
  file: File
  locale: ConciergeTranscribeLocale
}): Promise<{ text: string }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set (required for OpenAI Whisper transcription).")
  }

  const model = process.env.CONCIERGE_WHISPER_MODEL?.trim() || "whisper-1"
  const language = whisperLanguageForLocale(args.locale)

  const form = new FormData()
  form.append("file", args.file, args.file.name || "audio.webm")
  form.append("model", model)
  form.append("language", language)

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
  })

  const data: unknown = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg =
      typeof data === "object" && data !== null && "error" in data
        ? String((data as { error?: { message?: string } }).error?.message ?? res.statusText)
        : res.statusText
    throw new Error(msg || `OpenAI transcription failed (${res.status})`)
  }

  const text =
    typeof data === "object" && data !== null && "text" in data
      ? String((data as { text?: string }).text ?? "").trim()
      : ""
  if (!text) throw new Error("Empty transcription result.")
  return { text }
}

/** OpenRouter STT: https://openrouter.ai/docs/guides/overview/multimodal/stt */
export async function transcribeAudioWithOpenRouter(args: {
  file: File
  locale: ConciergeTranscribeLocale
}): Promise<{ text: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set (required for OpenRouter transcription).")
  }

  const model = process.env.CONCIERGE_OPENROUTER_STT_MODEL?.trim() || "openai/whisper-1"
  const language = whisperLanguageForLocale(args.locale)
  const format = sttFormatFromFile(args.file)
  const buf = Buffer.from(await args.file.arrayBuffer())
  const dataB64 = buf.toString("base64")

  const res = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model,
      input_audio: {
        data: dataB64,
        format,
      },
      language,
    }),
  })

  const data: unknown = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg =
      typeof data === "object" && data !== null && "error" in data
        ? String((data as { error?: { message?: string } }).error?.message ?? res.statusText)
        : res.statusText
    throw new Error(msg || `OpenRouter transcription failed (${res.status})`)
  }

  const text =
    typeof data === "object" && data !== null && "text" in data
      ? String((data as { text?: string }).text ?? "").trim()
      : ""
  if (!text) throw new Error("Empty transcription result.")
  return { text }
}

/**
 * Use OpenAI Whisper when OPENAI_API_KEY is set; otherwise OpenRouter STT when OPENROUTER_API_KEY is set.
 */
export async function transcribeConciergeAudio(args: {
  file: File
  locale: ConciergeTranscribeLocale
}): Promise<{ text: string }> {
  if (process.env.OPENAI_API_KEY?.trim()) {
    return transcribeAudioWithOpenAIWhisper(args)
  }
  if (process.env.OPENROUTER_API_KEY?.trim()) {
    return transcribeAudioWithOpenRouter(args)
  }
  throw new Error("No transcription API key: set OPENAI_API_KEY or OPENROUTER_API_KEY.")
}
