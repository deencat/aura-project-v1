/**
 * Voice-0: browser Web Speech API (SpeechRecognition).
 * iOS Safari generally does not expose SpeechRecognition — use text input or future Voice-1 (server STT).
 */

export function getSpeechRecognitionCtor(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognition
    webkitSpeechRecognition?: new () => SpeechRecognition
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

function isLikelyIOSWebKit(): boolean {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  if (/iP(hone|ad|od)/i.test(ua)) return true
  // iPadOS 13+ often reports as MacIntel with touch
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true
  return false
}

export function supportsWebSpeechRecognition(): boolean {
  if (typeof window === "undefined") return false
  // iOS Safari: ctor may exist but live recognition is unreliable; use server STT (tap to record).
  if (isLikelyIOSWebKit()) return false
  return getSpeechRecognitionCtor() !== null
}

/** BCP-47 tags for recognition; browser may ignore or approximate. */
export function recognitionLangForLocale(locale: "zh-HK" | "en" | "zh-Hans"): string {
  if (locale === "en") return "en-US"
  if (locale === "zh-Hans") return "zh-CN"
  /* HK Cantonese / Traditional — engines vary; zh-HK often maps better than yue-* on desktop Chrome */
  return "zh-HK"
}
