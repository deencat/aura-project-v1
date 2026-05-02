"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  getSpeechRecognitionCtor,
  recognitionLangForLocale,
  supportsWebSpeechRecognition,
} from "@/lib/concierge/web-speech"

type Locale = "zh-HK" | "en" | "zh-Hans"

const LISTEN_MS = 60_000

export function useConciergeWebSpeech(args: {
  locale: Locale
  onFinalTranscript: (text: string) => void
  disabled?: boolean
}) {
  const { locale, onFinalTranscript, disabled } = args
  const [listening, setListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recRef = useRef<SpeechRecognition | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const supported = supportsWebSpeechRecognition()

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    try {
      recRef.current?.stop()
    } catch {
      /* ignore */
    }
    recRef.current = null
    setListening(false)
  }, [])

  const start = useCallback(() => {
    setError(null)
    if (disabled) return
    if (!supported) {
      setError("no_speech_api")
      return
    }
    const Ctor = getSpeechRecognitionCtor()
    if (!Ctor) {
      setError("no_speech_api")
      return
    }

    stop()
    const rec = new Ctor()
    rec.lang = recognitionLangForLocale(locale)
    rec.interimResults = true
    rec.continuous = false
    rec.maxAlternatives = 1

    rec.onresult = (ev: SpeechRecognitionEvent) => {
      let finalText = ""
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const r = ev.results[i]
        if (r.isFinal) finalText += r[0]?.transcript ?? ""
      }
      const trimmed = finalText.trim()
      if (trimmed) onFinalTranscript(trimmed)
    }

    rec.onerror = (ev: SpeechRecognitionErrorEvent) => {
      if (ev.error === "aborted" || ev.error === "no-speech") return
      setError(ev.error ?? "speech_error")
      stop()
    }

    rec.onend = () => {
      stop()
    }

    recRef.current = rec
    try {
      rec.start()
      setListening(true)
      timerRef.current = setTimeout(() => {
        stop()
      }, LISTEN_MS)
    } catch {
      setError("start_failed")
      stop()
    }
  }, [disabled, locale, onFinalTranscript, stop, supported])

  useEffect(() => () => stop(), [stop])

  return { supported, listening, error, start, stop, clearError: () => setError(null) }
}
