/**
 * TTS-0: browser speechSynthesis (device voices; quality varies by OS).
 */

export function supportsSpeechSynthesis(): boolean {
  return typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined"
}

export function ttsLangForLocale(locale: "zh-HK" | "en" | "zh-Hans"): string {
  if (locale === "en") return "en-US"
  if (locale === "zh-Hans") return "zh-CN"
  return "zh-HK"
}

export function speakText(text: string, locale: "zh-HK" | "en" | "zh-Hans"): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text)
  u.lang = ttsLangForLocale(locale)
  u.rate = 1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
  return u
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}
