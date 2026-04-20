"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"

type Locale = "zh-HK" | "en" | "zh-Hans"

type ChatRole = "user" | "assistant"
type ChatMessage = { id: string; role: ChatRole; content: string }

function languageToLocale(lang: string): Locale {
  if (lang === "zh-Hans") return "zh-Hans"
  if (lang === "en") return "en"
  // Treat `zh-Hant` as HK-default written Traditional for now.
  return "zh-HK"
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function ConciergePage() {
  const { language, t } = useLanguage()
  const locale = useMemo(() => languageToLocale(language), [language])

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quickReplies, setQuickReplies] = useState<Record<string, string> | null>(null)
  const [links, setLinks] = useState<{ treatments?: string; contact?: string } | null>(null)

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
    }
  }, [locale])

  useEffect(() => {
    // auto-load greeting (server-driven) on first render
    let ignore = false
    async function boot() {
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
        setMessages([
          { id: uid(), role: "assistant", content: String(data?.reply ?? "") },
        ])
      } catch (e: any) {
        if (ignore) return
        setError(e?.message ?? "Failed to load concierge.")
      } finally {
        if (!ignore) setIsSending(false)
      }
    }
    boot()
    return () => {
      ignore = true
    }
  }, [locale])

  useEffect(() => {
    // keep the latest message visible
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
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: pendingId, role: "assistant", content: "…" },
    ])

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
      setMessages((prev) =>
        prev.map((m) => (m.id === pendingId ? { ...m, content: String(data?.reply ?? "") } : m))
      )
    } catch (e: any) {
      setMessages((prev) => prev.filter((m) => m.id !== pendingId))
      setError(e?.message ?? "Something went wrong.")
    } finally {
      setIsSending(false)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function clear() {
    setMessages([])
    setQuickReplies(null)
    setLinks(null)
    setError(null)
    setInput("")
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            <span className="text-primary">{ui.title}</span>
          </h1>
          <p className="mt-3 text-foreground/70">{ui.subtitle}</p>
        </div>

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
              className="max-h-[55vh] overflow-auto px-6 pb-6 pt-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent"
              role="region"
              aria-label={ui.ariaLive}
              aria-live="polite"
            >
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                  >
                    <div
                      className={[
                        "max-w-[92%] whitespace-pre-wrap rounded-2xl px-5 py-4 text-sm leading-relaxed md:max-w-[78%]",
                        m.role === "user"
                          ? "bg-[linear-gradient(180deg,rgba(232,90,139,0.22)_0%,rgba(198,62,110,0.18)_100%)] text-foreground shadow-sm shadow-pink-500/10"
                          : "border border-white/55 bg-white/55 text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md",
                      ].join(" ")}
                    >
                      {m.content}
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

            <form
              className="flex w-full flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <label className="sr-only" htmlFor="concierge-input">
                Message
              </label>
              <input
                ref={inputRef}
                id="concierge-input"
                className="h-11 w-full rounded-full border border-white/60 bg-white/55 px-4 text-sm text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md outline-none placeholder:text-foreground/45 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder={ui.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
                autoComplete="off"
              />
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
      </div>
    </div>
  )
}

