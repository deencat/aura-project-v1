"use client"

import { useCallback, useRef, useState } from "react"
import { encodeRecordingBlobAsWav16kMono } from "@/lib/concierge-recording-wav"

function pickRecorderMime(): string {
  if (typeof MediaRecorder === "undefined") return ""
  // Prefer MP4/AAC first: iOS Safari often has no WebM MediaRecorder; Whisper accepts mp4/m4a.
  const candidates = [
    "audio/mp4",
    "audio/aac",
    "audio/webm;codecs=opus",
    "audio/webm",
  ]
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c
  }
  return ""
}

/**
 * Whether the browser can attempt MediaRecorder-based capture.
 * Do not require `navigator.mediaDevices` here: on non-HTTPS URLs (e.g. http://LAN-IP:3000)
 * Safari hides `mediaDevices`, so the mic would stay disabled — we enable the control and
 * show an error on tap instead (see startRecording).
 */
export function supportsServerSttRecording(): boolean {
  return typeof window !== "undefined" && typeof MediaRecorder !== "undefined"
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

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(typeof window !== "undefined" && window.isSecureContext === false ? "needs_https" : "mic_unavailable")
      return
    }

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
            let uploadBlob: Blob = blob
            let uploadName = `recording.${extensionForMime(mime)}`
            try {
              uploadBlob = await encodeRecordingBlobAsWav16kMono(blob)
              uploadName = "recording.wav"
            } catch {
              /* decode/resample can fail on exotic codecs; fall back to raw container */
            }

            const fd = new FormData()
            fd.append("audio", uploadBlob, uploadName)
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
