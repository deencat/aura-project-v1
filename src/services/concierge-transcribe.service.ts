/**
 * Voice-1: server STT via OpenAI Whisper (https://platform.openai.com/docs/guides/speech-to-text).
 * Audio is not stored in Aura; forwarded to OpenAI only for transcription.
 */

export type ConciergeTranscribeLocale = "zh-HK" | "en" | "zh-Hans"

/** Whisper `language` is ISO-639-1; `zh` covers Chinese audio (Cantonese/Mandarin). */
export function whisperLanguageForLocale(locale: ConciergeTranscribeLocale): string {
  if (locale === "en") return "en"
  return "zh"
}

export async function transcribeAudioWithOpenAIWhisper(args: {
  file: File
  locale: ConciergeTranscribeLocale
}): Promise<{ text: string }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set (required for server voice transcription).")
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
