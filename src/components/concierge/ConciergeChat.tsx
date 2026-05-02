"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { Mic, Square, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { useConciergeWebSpeech } from "@/hooks/useConciergeWebSpeech"
import { speakText, stopSpeaking, supportsSpeechSynthesis } from "@/lib/concierge/tts-client"

type Locale = "zh-HK" | "en" | "zh-Hans"

type ChatRole = "user" | "assistant"
type SourceItem = {
  chunkId: string
  documentId: string
  tier: string
  language: string
  title: string | null
  sourceUrl: string | null
  updatedAt: string
}

type RollupSourceItem = {
  id: string
  topic: string
  language: string
  periodStart: string
  periodEnd: string
  updatedAt: string
}

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  sources?: SourceItem[]
  rollupSources?: RollupSourceItem[]
}

function languageToLocale(lang: string): Locale {
  if (lang === "zh-Hans") return "zh-Hans"
  if (lang === "en") return "en"
  return "zh-HK"
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function takeTop<T>(items: T[] | undefined, limit: number) {
  if (!items || items.length <= limit) return { top: items ?? [], more: 0 }
  return { top: items.slice(0, limit), more: items.length - limit }
}

export function ConciergeChat(props: { variant?: "page" | "widget" }) {
  const { language, t } = useLanguage()
  const locale = useMemo(() => languageToLocale(language), [language])
  const variant = props.variant ?? "page"

  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quickReplies, setQuickReplies] = useState<Record<string, string> | null>(null)
  const [links, setLinks] = useState<{ treatments?: string; contact?: string } | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)

  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const ui = useMemo(() => {
    if (locale === "zh-HK") {
      return {
        title: "Aura 美容 AI 禮賓",
        subtitle: "用最少問題，幫你配對合適療程（預覽版）",
        placeholder: "例如：我想淡斑同提亮，但皮膚偏敏感…",
        send: "送出",
        clear: "清除對話",
        disclaimer:
          "提示：內容只作一般資訊，唔係醫療診斷。如你有懷孕、皮膚病、嚴重敏感或正在服藥，建議先同治療師／醫生確認。",
        contact: "去聯絡 / 預約",
        treatments: "睇療程",
        ariaLive: "聊天訊息",
        sources: "來源",
        voiceMic: "語音輸入",
        voiceStop: "停止收音",
        voiceListening: "聆聽中…",
        voiceUnsupported:
          "此裝置或瀏覽器不支援語音輸入（例如 iPhone Safari 多數情況）。請打字輸入；進階版本將支援伺服器語音辨識。",
        voiceConsent: "語音只作轉成文字，內容經同一聊天流程處理。",
        readAloud: "朗讀",
        stopRead: "停止朗讀",
      }
    }
    if (locale === "zh-Hans") {
      return {
        title: "Aura 美容 AI 礼宾",
        subtitle: "用最少问题，帮你匹配合适疗程（预览版）",
        placeholder: "例如：我想淡斑提亮，但皮肤偏敏感…",
        send: "发送",
        clear: "清除对话",
        disclaimer:
          "提示：内容仅作一般信息，不构成医疗诊断。如你怀孕、皮肤病、严重敏感或正在用药，建议先与治疗师／医生确认。",
        contact: "去联系 / 预约",
        treatments: "看疗程",
        ariaLive: "聊天消息",
        sources: "來源",
        voiceMic: "语音输入",
        voiceStop: "停止",
        voiceListening: "正在聆听…",
        voiceUnsupported: "当前浏览器不支持语音输入，请改用文字。服务器语音识别将后续提供。",
        voiceConsent: "语音仅用于转成文字，并走同一套对话流程。",
        readAloud: "朗读",
        stopRead: "停止朗读",
      }
    }
    return {
      title: "Aura Beauty AI Concierge",
      subtitle: "A quick, guided match to the right treatments (preview)",
      placeholder: "e.g. I want brightening but my skin is sensitive…",
      send: "Send",
      clear: "Clear chat",
      disclaimer:
        "Note: This is general information, not medical advice. If you’re pregnant, have skin conditions, severe allergies, or are on medication, please confirm with a therapist/doctor first.",
      contact: "Contact / Book",
      treatments: "Browse treatments",
      ariaLive: "Chat messages",
      sources: "Sources",
      voiceMic: "Voice input",
      voiceStop: "Stop",
      voiceListening: "Listening…",
      voiceUnsupported:
        "Voice input is not supported in this browser (e.g. iPhone Safari). Please type your message; server STT will follow.",
      voiceConsent: "Voice is converted to text only and sent through the same chat flow.",
      readAloud: "Read aloud",
      stopRead: "Stop",
    }
  }, [locale])

  useEffect(() => {
    let ignore = false
    async function loadHistoryIfSignedIn() {
      if (!isAuthLoaded || !isSignedIn) return false
      try {
        const res = await fetch(`/api/concierge/history?locale=${encodeURIComponent(locale)}`, {
          method: "GET",
          credentials: "include",
        })
        if (res.status === 401) return false
        const data = await res.json()
        if (ignore) return false
        if (!res.ok) return false
        if (typeof data?.threadId === "string") setThreadId(data.threadId)
        if (Array.isArray(data?.messages) && data.messages.length > 0) {
          setMessages(
            data.messages.map((m: any) => ({
              id: String(m.id ?? uid()),
              role: m.role === "assistant" ? "assistant" : "user",
              content: String(m.content ?? ""),
              sources: Array.isArray(m?.sources) ? m.sources : undefined,
              rollupSources: Array.isArray(m?.rollupSources) ? m.rollupSources : undefined,
            }))
          )
          return true
        }
        return false
      } catch {
        return false
      }
    }

    async function loadGreeting() {
      try {
        setIsSending(true)
        const res = await fetch("/api/concierge/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale, message: "" }),
        })
        const data = await res.json()
        if (ignore) return
        if (!res.ok) throw new Error(data?.message ?? "Request failed")
        setQuickReplies(data?.quickReplies ?? null)
        setLinks(data?.links ?? null)
        setMessages([{ id: uid(), role: "assistant", content: String(data?.reply ?? "") }])
      } catch (e: any) {
        if (ignore) return
        setError(e?.message ?? "Failed to load concierge.")
      } finally {
        if (!ignore) setIsSending(false)
      }
    }

    async function boot() {
      const hasHistory = await loadHistoryIfSignedIn()
      if (!hasHistory) await loadGreeting()
    }

    boot()
    return () => {
      ignore = true
    }
  }, [locale, isAuthLoaded, isSignedIn])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages.length])

  async function send(message: string) {
    const trimmed = message.trim()
    if (!trimmed || isSending) return

    setError(null)
    setIsSending(true)
    setInput("")

    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed }
    const pendingId = uid()
    setMessages((prev) => [...prev, userMsg, { id: pendingId, role: "assistant", content: "…" }])

    try {
      const res = await fetch("/api/concierge/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, message: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message ?? "Request failed")

      setQuickReplies(data?.quickReplies ?? null)
      setLinks(data?.links ?? null)
      const assistantReply = String(data?.reply ?? "")
      const sources = Array.isArray(data?.sources) ? data.sources : undefined
      const rollupSources = Array.isArray(data?.rollupSources) ? data.rollupSources : undefined

      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                content: assistantReply,
                sources,
                rollupSources,
              }
            : m
        )
      )

      if (isAuthLoaded && isSignedIn) {
        try {
          const persistRes = await fetch("/api/concierge/history", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              locale,
              threadId,
              messages: [
                { role: "user", content: trimmed },
                { role: "assistant", content: assistantReply, sources, rollupSources },
              ],
            }),
          })
          const persistData = await persistRes.json().catch(() => null)
          if (persistRes.ok && typeof persistData?.threadId === "string") setThreadId(persistData.threadId)
        } catch {
          // best-effort persistence; ignore failures
        }
      }
    } catch (e: any) {
      setMessages((prev) => prev.filter((m) => m.id !== pendingId))
      setError(e?.message ?? "Something went wrong.")
    } finally {
      setIsSending(false)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  async function clear() {
    setMessages([])
    setQuickReplies(null)
    setLinks(null)
    setError(null)
    setInput("")
    requestAnimationFrame(() => inputRef.current?.focus())

    if (isAuthLoaded && isSignedIn) {
      try {
        const res = await fetch("/api/concierge/history/new", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale }),
        })
        const data = await res.json().catch(() => null)
        if (res.ok && typeof data?.threadId === "string") setThreadId(data.threadId)
      } catch {
        // ignore
      }
    } else {
      setThreadId(null)
    }
  }

  const voiceUiEnabled = process.env.NEXT_PUBLIC_CONCIERGE_VOICE_UI !== "false"

  const onVoiceFinalRef = useRef<(text: string) => void>(() => {})
  onVoiceFinalRef.current = (text: string) => {
    void send(text)
  }
  const onVoiceFinalStable = useCallback((text: string) => {
    onVoiceFinalRef.current(text)
  }, [])

  const voice = useConciergeWebSpeech({
    locale,
    disabled: isSending || !voiceUiEnabled,
    onFinalTranscript: onVoiceFinalStable,
  })

  const [ttsPlayingId, setTtsPlayingId] = useState<string | null>(null)

  const playAssistantTts = useCallback(
    (messageId: string, text: string) => {
      if (!supportsSpeechSynthesis() || !text.trim() || text === "…") return
      if (ttsPlayingId === messageId) {
        stopSpeaking()
        setTtsPlayingId(null)
        return
      }
      stopSpeaking()
      setTtsPlayingId(messageId)
      const u = speakText(text, locale)
      u.onend = () => setTtsPlayingId((p) => (p === messageId ? null : p))
      u.onerror = () => setTtsPlayingId((p) => (p === messageId ? null : p))
    },
    [locale, ttsPlayingId]
  )

  const maxHeightClass = variant === "widget" ? "max-h-[55vh]" : "max-h-[65vh]"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{t("special_offers", "Special Offers")}</Badge>
            <Badge variant="outline">{t("treatments", "Treatments")}</Badge>
            <Badge variant="outline">AI</Badge>
          </div>
          <div className="flex gap-2">
            {links?.treatments && (
              <Button asChild variant="outline" size="sm">
                <Link href={links.treatments}>{ui.treatments}</Link>
              </Button>
            )}
            {links?.contact && (
              <Button asChild size="sm">
                <Link href={links.contact}>{ui.contact}</Link>
              </Button>
            )}
          </div>
        </div>

        <div className={variant === "widget" ? "text-left" : "text-center"}>
          <div className="text-xl font-bold tracking-tight">
            <span className="text-primary">{ui.title}</span>
          </div>
          {variant === "page" ? <p className="mt-2 text-sm text-foreground/70">{ui.subtitle}</p> : null}
        </div>

        {quickReplies && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(quickReplies).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className="rounded-full border border-white/55 bg-white/45 px-4 py-2 text-sm font-semibold text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md transition hover:bg-white/65 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => send(label)}
                disabled={isSending}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div
          ref={listRef}
          className={`${maxHeightClass} overflow-auto px-6 pb-6 pt-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent`}
          role="region"
          aria-label={ui.ariaLive}
          aria-live="polite"
        >
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className="max-w-[92%] md:max-w-[78%]">
                  <div
                    className={[
                      "whitespace-pre-wrap rounded-2xl px-5 py-4 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-[linear-gradient(180deg,rgba(232,90,139,0.22)_0%,rgba(198,62,110,0.18)_100%)] text-foreground shadow-sm shadow-pink-500/10"
                        : "border border-white/55 bg-white/55 text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md",
                    ].join(" ")}
                  >
                    {m.content}
                  </div>

                  {voiceUiEnabled &&
                  m.role === "assistant" &&
                  m.content &&
                  m.content !== "…" &&
                  supportsSpeechSynthesis() ? (
                    <div className="mt-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-foreground/80"
                        onClick={() => playAssistantTts(m.id, m.content)}
                        aria-pressed={ttsPlayingId === m.id}
                      >
                        <Volume2 className="mr-1.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                        {ttsPlayingId === m.id ? ui.stopRead : ui.readAloud}
                      </Button>
                    </div>
                  ) : null}

                  {m.role === "assistant" && (m.rollupSources?.length || m.sources?.length) ? (
                    <details className="mt-2 rounded-2xl border border-white/45 bg-white/35 px-4 py-3 text-xs text-foreground/80 shadow-sm shadow-pink-500/10 backdrop-blur-md">
                      <summary className="cursor-pointer select-none font-semibold">
                        {ui.sources} ({(m.rollupSources?.length ?? 0) + (m.sources?.length ?? 0)})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {m.rollupSources?.length ? (
                          <div>
                            <div className="font-semibold">Trends rollups</div>
                            <ul className="mt-1 list-disc space-y-1 pl-5">
                              {takeTop(m.rollupSources, 3).top.map((r) => (
                                <li key={r.id}>
                                  <span className="font-semibold">{r.topic}</span>{" "}
                                  <span className="text-foreground/70">
                                    ({r.language}) {new Date(r.periodStart).toLocaleDateString()} →{" "}
                                    {new Date(r.periodEnd).toLocaleDateString()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {takeTop(m.rollupSources, 3).more ? (
                              <div className="mt-1 text-foreground/70">+ {takeTop(m.rollupSources, 3).more} more</div>
                            ) : null}
                          </div>
                        ) : null}

                        {m.sources?.length ? (
                          <div>
                            <div className="font-semibold">Knowledge Bank</div>
                            <ul className="mt-1 list-disc space-y-1 pl-5">
                              {takeTop(m.sources, 5).top.map((s) => (
                                <li key={s.chunkId}>
                                  <span className="font-semibold">
                                    [{s.tier}] ({s.language}) {s.title ?? "(untitled)"}
                                  </span>
                                  {s.sourceUrl ? (
                                    <>
                                      {" "}
                                      <a
                                        href={s.sourceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline decoration-pink-400/60 underline-offset-2"
                                      >
                                        source
                                      </a>
                                    </>
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                            {takeTop(m.sources, 5).more ? (
                              <div className="mt-1 text-foreground/70">+ {takeTop(m.sources, 5).more} more</div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </details>
                  ) : null}
                </div>
              </div>
            ))}

            {error && (
              <div className="rounded-2xl border border-white/55 bg-white/55 px-5 py-4 text-sm text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md">
                {error}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-white/50 p-5">
        <p className="text-xs text-foreground/60">{ui.disclaimer}</p>

        {voiceUiEnabled ? <p className="text-[11px] leading-snug text-foreground/55">{ui.voiceConsent}</p> : null}
        {voiceUiEnabled && !voice.supported ? (
          <p className="text-xs leading-relaxed text-foreground/70">{ui.voiceUnsupported}</p>
        ) : null}
        {voiceUiEnabled && voice.supported && voice.listening ? (
          <p className="text-xs font-medium text-primary">{ui.voiceListening}</p>
        ) : null}

        <form
          className="flex w-full flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
        >
          <label className="sr-only" htmlFor={variant === "widget" ? "concierge-input-widget" : "concierge-input-page"}>
            Message
          </label>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            {voiceUiEnabled ? (
              <Button
                type="button"
                variant={voice.listening ? "default" : "outline"}
                className="h-11 w-11 shrink-0 rounded-full p-0"
                disabled={isSending || !voice.supported}
                onClick={() => (voice.listening ? voice.stop() : voice.start())}
                aria-pressed={voice.listening}
                aria-label={voice.listening ? ui.voiceStop : ui.voiceMic}
                title={!voice.supported ? ui.voiceUnsupported : undefined}
              >
                {voice.listening ? <Square className="h-4 w-4 fill-current" /> : <Mic className="h-4 w-4" />}
              </Button>
            ) : null}
            <input
              ref={inputRef}
              id={variant === "widget" ? "concierge-input-widget" : "concierge-input-page"}
              className="h-11 min-w-0 flex-1 rounded-full border border-white/60 bg-white/55 px-4 text-sm text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md outline-none placeholder:text-foreground/45 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder={ui.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="h-11 flex-1 px-6" disabled={isSending}>
              {ui.send}
            </Button>
            <Button type="button" variant="outline" className="h-11 px-5" onClick={clear} disabled={isSending}>
              {ui.clear}
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}

