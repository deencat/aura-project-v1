"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Tier = "T0" | "T1" | "T2" | "T3"
type Status = "staging" | "active" | "archived"

type DocRow = {
  id: string
  tier: Tier
  status: Status
  language: string
  title: string | null
  sourceUrl: string | null
  topics: string[]
  publishedAt: string | null
  updatedAt: string
  chunkCount: number
}

export default function KnowledgeAdminPage() {
  const [tier, setTier] = useState<Tier>("T0")
  const [status, setStatus] = useState<Status>("active")
  const [language, setLanguage] = useState<string>("zh-HK")
  const [title, setTitle] = useState("")
  const [sourceUrl, setSourceUrl] = useState("")
  const [topics, setTopics] = useState("")
  const [content, setContent] = useState("")
  const [chunkCharLimit, setChunkCharLimit] = useState<number>(1400)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [docs, setDocs] = useState<DocRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isBackfilling, setIsBackfilling] = useState(false)

  const topicsList = useMemo(
    () =>
      topics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [topics]
  )

  async function load() {
    setIsLoading(true)
    try {
      const res = await fetch("/api/knowledge/documents?limit=50", { credentials: "include" })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message ?? "Failed to load documents.")
      setDocs(data?.documents ?? [])
    } catch (e: any) {
      setError(e?.message ?? "Failed to load documents.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/knowledge/documents", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tier,
          status,
          language,
          title: title.trim() || null,
          sourceUrl: sourceUrl.trim() || null,
          topics: topicsList,
          content,
          chunkCharLimit,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message ?? "Failed to create document.")

      setSuccess(`Saved. Chunks created: ${data?.chunkCount ?? "?"}`)
      setContent("")
      setTitle("")
      setSourceUrl("")
      setTopics("")
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to create document.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function backfillEmbeddings() {
    setError(null)
    setSuccess(null)
    setIsBackfilling(true)
    try {
      const res = await fetch("/api/knowledge/embeddings/backfill", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ limit: 120, batchSize: 16 }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.message ?? data?.error ?? "Failed to backfill embeddings.")
      }
      setSuccess(`Embeddings backfilled. embedded=${data.embedded} scanned=${data.scanned} batches=${data.batches}`)
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to backfill embeddings.")
    } finally {
      setIsBackfilling(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Bank</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Upload canonical salon facts (T0) and curated content. This powers RAG grounding later.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={backfillEmbeddings} disabled={isLoading || isBackfilling}>
            {isBackfilling ? "Backfilling…" : "Backfill embeddings"}
          </Button>
          <Button variant="outline" onClick={load} disabled={isLoading}>
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload document</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tier</label>
              <Select value={tier} onValueChange={(v) => setTier(v as Tier)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T0">T0 — Canonical</SelectItem>
                  <SelectItem value="T1">T1 — Owned editorial</SelectItem>
                  <SelectItem value="T2">T2 — Curated third-party</SelectItem>
                  <SelectItem value="T3">T3 — Raw staging</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="staging">staging</SelectItem>
                  <SelectItem value="archived">archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={language} onValueChange={setLanguage}>
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
              <label className="text-sm font-medium">Chunk size (chars)</label>
              <Input
                type="number"
                value={chunkCharLimit}
                onChange={(e) => setChunkCharLimit(Number(e.target.value))}
                min={400}
                max={4000}
              />
              <p className="text-xs text-foreground/60">Recommended 1200–1800 for curated text.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Title (optional)</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Royal Black Scan — FAQ" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Source URL (optional)</label>
              <Input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://..." />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Topics (comma separated)</label>
              <Input value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="e.g. pigmentation, laser, aftercare" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste canonical salon copy, contraindications, aftercare, pricing policy, etc."
                className="min-h-[220px]"
              />
              <p className="text-xs text-foreground/60">
                Keep T0 factual and conservative (no medical diagnosis or guaranteed outcomes).
              </p>
            </div>

            {error && (
              <div className="rounded-2xl border border-white/55 bg-white/55 p-4 text-sm text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md md:col-span-2">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-2xl border border-white/55 bg-white/55 p-4 text-sm text-foreground shadow-sm shadow-pink-500/10 backdrop-blur-md md:col-span-2">
                {success}
              </div>
            )}

            <div className="md:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : "Save document"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent documents</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-sm text-foreground/70">Loading…</div>
          ) : docs.length === 0 ? (
            <div className="text-sm text-foreground/70">No documents yet.</div>
          ) : (
            <div className="space-y-3">
              {docs.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col gap-2 rounded-2xl border border-white/55 bg-white/55 p-4 shadow-sm shadow-pink-500/10 backdrop-blur-md md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{d.tier}</Badge>
                      <Badge variant="outline">{d.status}</Badge>
                      <Badge variant="outline">{d.language}</Badge>
                      <Badge variant="outline">{d.chunkCount} chunks</Badge>
                    </div>
                    <div className="mt-2 truncate text-sm font-semibold">
                      {d.title ?? "(untitled)"}
                    </div>
                    {d.topics?.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {d.topics.slice(0, 6).map((t) => (
                          <span key={t} className="text-xs text-foreground/65">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-foreground/60">
                    Updated {new Date(d.updatedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

