/**
 * Voice-1: server STT.
 * - OPENAI_API_KEY (optional): direct OpenAI Whisper multipart.
 * - OPENROUTER_API_KEY: OpenRouter only — default uses chat completions + Mistral Voxtral (audio in → text),
 *   which avoids OpenAI-only /audio/transcriptions (HK / ToS issues with openai/whisper-*).
 *   Set CONCIERGE_OPENROUTER_STT_MODEL=openai/whisper-1 (etc.) only if you explicitly want the STT endpoint.
 *
 * Audio is not stored in Aura; forwarded only for transcription.
 */

export type ConciergeTranscribeLocale = "zh-HK" | "en" | "zh-Hans"

/** Whisper / dedicated STT `language` is ISO-639-1; `zh` covers Chinese. */
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

function transcribeOnlyUserPrompt(locale: ConciergeTranscribeLocale): string {
  if (locale === "en") {
    return "Transcribe this audio accurately. Reply with only the spoken words — no preamble, labels, or explanation."
  }
  if (locale === "zh-Hans") {
    return "请准确将这段录音转成文字，只输出所说的内容，不要任何说明或标题。"
  }
  return "請準確將呢段錄音轉做文字，只輸出講嘅內容，唔好加任何說明或標題。"
}

/** OpenRouter chat `choices[0].message.content` may be string or structured parts. */
function textFromChatCompletionBody(data: unknown): string {
  if (typeof data !== "object" || data === null) return ""
  const choice = (data as { choices?: Array<{ message?: { content?: unknown } }> }).choices?.[0]
  const raw = choice?.message?.content
  if (typeof raw === "string") return raw.trim()
  if (Array.isArray(raw)) {
    const parts: string[] = []
    for (const p of raw) {
      if (typeof p === "object" && p !== null && "text" in p) {
        parts.push(String((p as { text?: string }).text ?? ""))
      }
    }
    return parts.join("").trim()
  }
  return ""
}

function openRouterUsesDedicatedSttEndpoint(model: string): boolean {
  const m = model.toLowerCase()
  if (!m.startsWith("openai/")) return false
  return m.includes("whisper") || m.includes("transcribe")
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

async function transcribeWithOpenRouterDedicatedStt(args: {
  file: File
  locale: ConciergeTranscribeLocale
  apiKey: string
  model: string
}): Promise<{ text: string }> {
  const language = whisperLanguageForLocale(args.locale)
  const format = sttFormatFromFile(args.file)
  const buf = Buffer.from(await args.file.arrayBuffer())
  const dataB64 = buf.toString("base64")

  const res = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model: args.model,
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
    throw new Error(msg || `OpenRouter STT failed (${res.status})`)
  }

  const text =
    typeof data === "object" && data !== null && "text" in data
      ? String((data as { text?: string }).text ?? "").trim()
      : ""
  if (!text) throw new Error("Empty transcription result.")
  return { text }
}

/**
 * OpenRouter: chat completions + `input_audio` (e.g. Mistral Voxtral — non-OpenAI STT path).
 * @see https://openrouter.ai/docs/guides/overview/multimodal/audio
 */
async function transcribeWithOpenRouterChatAudio(args: {
  file: File
  locale: ConciergeTranscribeLocale
  apiKey: string
  model: string
}): Promise<{ text: string }> {
  const format = sttFormatFromFile(args.file)
  const buf = Buffer.from(await args.file.arrayBuffer())
  const dataB64 = buf.toString("base64")

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Aura",
    },
    body: JSON.stringify({
      model: args.model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: transcribeOnlyUserPrompt(args.locale) },
            {
              type: "input_audio",
              input_audio: {
                data: dataB64,
                format,
              },
            },
          ],
        },
      ],
      temperature: 0,
      max_tokens: 2048,
    }),
  })

  const data: unknown = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg =
      typeof data === "object" && data !== null && "error" in data
        ? String((data as { error?: { message?: string } }).error?.message ?? res.statusText)
        : res.statusText
    throw new Error(msg || `OpenRouter chat transcription failed (${res.status})`)
  }

  const text = textFromChatCompletionBody(data)
  if (!text) throw new Error("Empty transcription result.")
  return { text }
}

/** OpenRouter STT: Voxtral via chat by default; openai/whisper-* only if set explicitly. */
export async function transcribeAudioWithOpenRouter(args: {
  file: File
  locale: ConciergeTranscribeLocale
}): Promise<{ text: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set (required for OpenRouter transcription).")
  }

  const model =
    process.env.CONCIERGE_OPENROUTER_STT_MODEL?.trim() || "mistralai/voxtral-small-24b-2507"

  if (openRouterUsesDedicatedSttEndpoint(model)) {
    return transcribeWithOpenRouterDedicatedStt({ ...args, apiKey, model })
  }
  return transcribeWithOpenRouterChatAudio({ ...args, apiKey, model })
}

/**
 * OPENAI_API_KEY first (optional); else OPENROUTER_API_KEY (Voxtral chat STT by default).
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
  throw new Error("No transcription API key: set OPENAI_API_KEY (optional) or OPENROUTER_API_KEY.")
}
