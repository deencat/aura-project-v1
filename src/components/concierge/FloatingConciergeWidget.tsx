"use client"

import React, { useMemo, useState } from "react"
import { MessageCircle, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ConciergeChat } from "@/components/concierge/ConciergeChat"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext"

export default function FloatingConciergeWidget() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)

  const hideWidget = pathname?.startsWith("/concierge")

  const title = useMemo(() => {
    if (language === "zh-Hans") return "AI 礼宾"
    if (language === "en") return "AI Concierge"
    return "AI 禮賓"
  }, [language])

  if (hideWidget) return null

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className={cn(
              "h-14 w-14 rounded-full p-0 shadow-lg shadow-pink-500/20",
              "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.65)_35%,rgba(255,255,255,0.4)_100%)]",
              "border border-white/60 text-foreground backdrop-blur-md hover:bg-white/70"
            )}
            aria-label={title}
          >
            <span className="relative">
              <MessageCircle className="h-6 w-6" />
              <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-pink-500/70" />
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent
          className={cn(
            "w-[calc(100vw-2rem)] max-w-[560px] p-0",
            "border-white/55 bg-white/70 backdrop-blur-xl",
            "shadow-xl shadow-pink-500/15"
          )}
        >
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-foreground">{title}</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <ConciergeChat variant="widget" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

