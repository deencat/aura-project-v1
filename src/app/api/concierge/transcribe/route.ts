import { NextResponse } from "next/server"

/**
 * Voice-1 (future): multipart audio → server STT (Azure / Google / OpenAI Whisper, etc.).
 * Stub returns 501 until a provider and PDPO flow are wired.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "not_implemented",
      message:
        "Server-side transcription (Voice-1) is not configured yet. Use the microphone on supported desktop browsers, or type your message.",
    },
    { status: 501 }
  )
}
