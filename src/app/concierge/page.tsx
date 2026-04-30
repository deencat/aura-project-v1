"use client"

import React, { useMemo } from "react"
import { ConciergeChat } from "@/components/concierge/ConciergeChat"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ConciergePage() {
  const { language } = useLanguage()

  const ui = useMemo(() => {
    if (language === "zh-Hans") {
      return {
        title: "Aura 美容 AI 礼宾",
        subtitle: "用最少问题，帮你匹配合适疗程（预览版）",
      }
    }
    if (language === "en") {
      return {
        title: "Aura Beauty AI Concierge",
        subtitle: "A quick, guided match to the right treatments (preview)",
      }
    }
    return {
      title: "Aura 美容 AI 禮賓",
      subtitle: "用最少問題，幫你配對合適療程（預覽版）",
    }
  }, [language])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            <span className="text-primary">{ui.title}</span>
          </h1>
          <p className="mt-3 text-foreground/70">{ui.subtitle}</p>
        </div>

        <ConciergeChat variant="page" />
      </div>
    </div>
  )
}

