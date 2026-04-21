"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Locale = "zh-HK" | "zh-Hant" | "zh-Hans" | "en"

type RollupRow = {
  id: string
  topic: string
  language: string
  periodStart: string
  periodEnd: string
  summaryText: string
  updatedAt: string
}

export default function TrendsAdminPage() {
  const [topic, setTopic] = useState("護膚趨勢")
  const [language, setLanguage] = useState<Locale>("zh-HK")
  const [days, setDays] = useState(14)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rollups, setRollups] = useState<RollupRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const title = useMemo(() => (language === "en" ? "Trends Rollups" : "趨勢匯總"), [language])

  async function load() {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/knowledge/rollups?limit=20&language=${encodeURIComponent(language)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message ?? "Failed to load rollups.")
      setRollups(data?.rollups ?? [])
    } catch (e: any) {
      setError(e?.message ?? "Failed to load rollups.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  async function generate() {
    setError(null)
    setIsGenerating(true)
    try {
      const res = await fetch("/api/knowledge/rollups/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic, language, days }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message ?? "Failed to generate rollup.")
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to generate rollup.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Generate weekly rollups from recent T2/T3 documents. Concierge uses rollups for “trends” questions.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={isLoading}>
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate rollup</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={(v) => setLanguage(v as Locale)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh-HK">zh-HK</SelectItem>
                <SelectItem value="zh-Hant">zh-Hant</SelectItem>
                <SelectItem value="zh-Hans">zh-Hans</SelectItem>
                <SelectItem value="en">en</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Days</label>
            <Input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} min={3} max={60} />
            <p className="text-xs text-foreground/60">Pull source docs from the last N days.</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Topic</label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. 護膚趨勢 / 美白淡斑 / 醫美話題" />
          </div>

          <div className="md:col-span-2">
            <Button onClick={generate} disabled={isGenerating}>
              {isGenerating ? "Generating…" : "Generate"}
            </Button>
          </div>

          {error && (
            <div className="rounded-2xl border border-white/55 bg-white/55 p-4 text-sm text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md md:col-span-2">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent rollups</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-sm text-foreground/70">Loading…</div>
          ) : rollups.length === 0 ? (
            <div className="text-sm text-foreground/70">
              No rollups yet. Add some T2/T3 docs (active) and click Generate.
            </div>
          ) : (
            <div className="space-y-4">
              {rollups.map((r) => (
                <div key={r.id} className="rounded-2xl border border-white/55 bg-white/55 p-4 shadow-sm shadow-pink-500/10 backdrop-blur-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{r.topic}</Badge>
                    <Badge variant="outline">{r.language}</Badge>
                    <Badge variant="outline">
                      {new Date(r.periodStart).toLocaleDateString()} → {new Date(r.periodEnd).toLocaleDateString()}
                    </Badge>
                  </div>
                  <Textarea value={r.summaryText} readOnly className="mt-3 min-h-[140px]" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

