"use client"

import { useCallback, useRef, useState } from "react"

function pickRecorderMime(): string {
  if (typeof MediaRecorder === "undefined") return ""
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/aac",
  ]
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c
  }
  return ""
}

export function supportsServerSttRecording(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    typeof MediaRecorder !== "undefined"
  )
}

function extensionForMime(mime: string): string {
  if (mime.includes("webm")) return "webm"
  if (mime.includes("mp4")) return "mp4"
  if (mime.includes("aac")) return "aac"
  return "webm"
}

type Locale = "zh-HK" | "en" | "zh-Hans"

export function useConciergeServerStt() {
  const [recording, setRecording] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const mimeRef = useRef<string>("")

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  const startRecording = useCallback(async () => {
    setError(null)
    if (!supportsServerSttRecording()) {
      setError("no_recorder")
      return
    }
    const mime = pickRecorderMime()
    if (!mime) {
      setError("no_mime")
      return
    }
    mimeRef.current = mime
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setError("mic_denied")
      return
    }
    streamRef.current = stream
    chunksRef.current = []
    const rec = new MediaRecorder(stream, { mimeType: mime })
    mediaRecorderRef.current = rec
    rec.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    rec.start(250)
    setRecording(true)
  }, [])

  const stopRecordingAndTranscribe = useCallback(
    async (locale: Locale): Promise<string | null> => {
      const rec = mediaRecorderRef.current
      if (!rec || rec.state === "inactive") {
        setRecording(false)
        stopTracks()
        return null
      }

      return await new Promise<string | null>((resolve) => {
        rec.onstop = async () => {
          mediaRecorderRef.current = null
          setRecording(false)
          stopTracks()

          const mime = mimeRef.current || "audio/webm"
          const blob = new Blob(chunksRef.current, { type: mime })
          chunksRef.current = []

          if (blob.size < 256) {
            setError("empty_audio")
            resolve(null)
            return
          }

          setBusy(true)
          setError(null)
          try {
            const ext = extensionForMime(mime)
            const fd = new FormData()
            fd.append("audio", blob, `recording.${ext}`)
            fd.append("locale", locale)

            const res = await fetch("/api/concierge/transcribe", {
              method: "POST",
              body: fd,
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
              setError(typeof data?.message === "string" ? data.message : `HTTP ${res.status}`)
              resolve(null)
              return
            }
            const text = typeof data?.text === "string" ? data.text.trim() : ""
            if (!text) {
              setError("empty_transcript")
              resolve(null)
              return
            }
            resolve(text)
          } catch (e) {
            setError(e instanceof Error ? e.message : "transcribe_failed")
            resolve(null)
          } finally {
            setBusy(false)
          }
        }
        rec.stop()
      })
    },
    [stopTracks]
  )

  const cancelRecording = useCallback(() => {
    const rec = mediaRecorderRef.current
    if (rec && rec.state !== "inactive") {
      rec.onstop = null
      rec.stop()
    }
    mediaRecorderRef.current = null
    chunksRef.current = []
    setRecording(false)
    stopTracks()
  }, [stopTracks])

  return {
    recording,
    busy,
    error,
    clearError: () => setError(null),
    startRecording,
    stopRecordingAndTranscribe,
    cancelRecording,
  }
}
