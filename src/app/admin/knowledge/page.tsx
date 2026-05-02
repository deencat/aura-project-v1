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
  approvedAt?: string | null
  approvedByUserId?: string | null
}

type EditDoc = DocRow & { content: string }

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
  const [isSeeding, setIsSeeding] = useState(false)
  const [isIngesting, setIsIngesting] = useState(false)
  const [runs, setRuns] = useState<
    Array<{ id: string; status: string; startedAt: string; endedAt: string | null; stats: any; errorLog: any }>
  >([])
  const [isLoadingRuns, setIsLoadingRuns] = useState(false)
  const [editing, setEditing] = useState<EditDoc | null>(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)

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

  async function loadRuns() {
    setIsLoadingRuns(true)
    try {
      const res = await fetch("/api/knowledge/ingest/runs", { credentials: "include" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? "Failed to load ingestion runs.")
      setRuns(Array.isArray(data?.runs) ? data.runs : [])
    } catch (e: any) {
      setError(e?.message ?? "Failed to load ingestion runs.")
    } finally {
      setIsLoadingRuns(false)
    }
  }

  async function runIngestionNow() {
    setError(null)
    setSuccess(null)
    setIsIngesting(true)
    try {
      const res = await fetch("/api/knowledge/ingest/admin/run", { method: "POST", credentials: "include" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? "Failed to run ingestion.")
      setSuccess(`Ingestion done. runId=${data?.runId ?? "?"} created=${data?.totals?.created ?? "?"} errors=${data?.totals?.errors ?? 0}`)
      await load()
      await loadRuns()
    } catch (e: any) {
      setError(e?.message ?? "Failed to run ingestion.")
    } finally {
      setIsIngesting(false)
    }
  }

  async function runHtmlIngestionNow() {
    setError(null)
    setSuccess(null)
    setIsIngesting(true)
    try {
      const res = await fetch("/api/knowledge/ingest/html/admin/run", { method: "POST", credentials: "include" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? "Failed to run HTML ingestion.")
      setSuccess(
        `HTML ingestion done. runId=${data?.runId ?? "?"} created=${data?.totals?.created ?? "?"} errors=${data?.totals?.errors ?? 0}`
      )
      await load()
      await loadRuns()
    } catch (e: any) {
      setError(e?.message ?? "Failed to run HTML ingestion.")
    } finally {
      setIsIngesting(false)
    }
  }

  async function quickUpdateDoc(id: string, patch: Partial<EditDoc>) {
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/knowledge/documents/${encodeURIComponent(id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? data?.error ?? "Failed to update.")
      setSuccess("Updated.")
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to update.")
    }
  }

  async function promoteActivate(id: string) {
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/knowledge/documents/${encodeURIComponent(id)}/promote/activate`, {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? data?.error ?? "Failed to activate.")
      setSuccess("Activated.")
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to activate.")
    }
  }

  async function promoteApproveT3ToT2(id: string) {
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/knowledge/documents/${encodeURIComponent(id)}/promote/approve-t3-to-t2`, {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? data?.error ?? "Failed to approve.")
      setSuccess("Approved → T2.")
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to approve.")
    }
  }

  useEffect(() => {
    load()
    loadRuns()
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

  async function seedHongKongPack() {
    setError(null)
    setSuccess(null)
    setIsSeeding(true)
    try {
      const res = await fetch("/api/knowledge/seed/hk-starter", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.message ?? data?.error ?? "Failed to seed knowledge pack.")
      }
      setSuccess(`Seeded. created=${data?.created?.length ?? 0} skipped=${data?.skipped?.length ?? 0}`)
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to seed knowledge pack.")
    } finally {
      setIsSeeding(false)
    }
  }

  async function seedHongKongMarketPack() {
    setError(null)
    setSuccess(null)
    setIsSeeding(true)
    try {
      const res = await fetch("/api/knowledge/seed/hk-market", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.message ?? data?.error ?? "Failed to seed market pack.")
      }
      setSuccess(`Seeded market pack. created=${data?.created?.length ?? 0} skipped=${data?.skipped?.length ?? 0}`)
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to seed market pack.")
    } finally {
      setIsSeeding(false)
    }
  }

  async function startEdit(id: string) {
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/knowledge/documents/${encodeURIComponent(id)}`, { credentials: "include" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? "Failed to load document.")
      const d = data?.document
      setEditing({
        id: String(d.id),
        tier: d.tier as Tier,
        status: d.status as Status,
        language: String(d.language),
        title: d.title ?? null,
        sourceUrl: d.sourceUrl ?? null,
        topics: Array.isArray(d.topics) ? d.topics : [],
        publishedAt: d.publishedAt ? String(d.publishedAt) : null,
        updatedAt: String(d.updatedAt),
        chunkCount: Number(d.chunkCount ?? 0),
        content: String(d.content ?? ""),
      })
    } catch (e: any) {
      setError(e?.message ?? "Failed to load document.")
    }
  }

  async function saveEdit() {
    if (!editing) return
    setError(null)
    setSuccess(null)
    setIsSavingEdit(true)
    try {
      const res = await fetch(`/api/knowledge/documents/${encodeURIComponent(editing.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tier: editing.tier,
          status: editing.status,
          language: editing.language,
          title: editing.title,
          sourceUrl: editing.sourceUrl,
          topics: editing.topics,
          content: editing.content,
          chunkCharLimit,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? data?.error ?? "Failed to update.")
      setSuccess(`Updated. Chunks: ${data?.chunkCount ?? "?"}`)
      setEditing(null)
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to update.")
    } finally {
      setIsSavingEdit(false)
    }
  }

  async function deleteDoc(id: string) {
    const ok = window.confirm("Delete this document? This will also delete its chunks.")
    if (!ok) return
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/knowledge/documents/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.message ?? "Failed to delete.")
      setSuccess("Deleted.")
      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete.")
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
          <Button variant="outline" onClick={runIngestionNow} disabled={isLoading || isSeeding || isIngesting}>
            {isIngesting ? "Ingesting…" : "Run RSS ingestion"}
          </Button>
          <Button variant="outline" onClick={runHtmlIngestionNow} disabled={isLoading || isSeeding || isIngesting}>
            {isIngesting ? "Ingesting…" : "Run HTML ingestion"}
          </Button>
          <Button variant="outline" onClick={seedHongKongPack} disabled={isLoading || isSeeding}>
            {isSeeding ? "Seeding…" : "Seed HK starter pack"}
          </Button>
          <Button variant="outline" onClick={seedHongKongMarketPack} disabled={isLoading || isSeeding}>
            {isSeeding ? "Seeding…" : "Seed HK market pack"}
          </Button>
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
          <CardTitle>Ingestion runs (latest)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingRuns ? (
            <div className="text-sm text-foreground/70">Loading…</div>
          ) : runs.length === 0 ? (
            <div className="text-sm text-foreground/70">No runs yet.</div>
          ) : (
            <div className="space-y-2">
              {runs.slice(0, 10).map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 text-sm shadow-sm shadow-pink-500/10 backdrop-blur-md md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{r.status}</Badge>
                      <span className="text-xs text-foreground/60">runId {r.id}</span>
                    </div>
                    <div className="mt-1 text-xs text-foreground/60">
                      {new Date(r.startedAt).toLocaleString()} → {r.endedAt ? new Date(r.endedAt).toLocaleString() : "…"}
                    </div>
                  </div>
                  <div className="text-xs text-foreground/70">
                    created {r?.stats?.totals?.created ?? "?"} · skipped {r?.stats?.totals?.skipped ?? "?"} · errors{" "}
                    {r?.stats?.totals?.errors ?? "?"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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

      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit document</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tier</label>
              <Select value={editing.tier} onValueChange={(v) => setEditing((p) => (p ? { ...p, tier: v as Tier } : p))}>
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
              <Select
                value={editing.status}
                onValueChange={(v) => setEditing((p) => (p ? { ...p, status: v as Status } : p))}
              >
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
              <Select value={editing.language} onValueChange={(v) => setEditing((p) => (p ? { ...p, language: v } : p))}>
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
              <label className="text-sm font-medium">Title</label>
              <Input value={editing.title ?? ""} onChange={(e) => setEditing((p) => (p ? { ...p, title: e.target.value } : p))} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Source URL</label>
              <Input
                value={editing.sourceUrl ?? ""}
                onChange={(e) => setEditing((p) => (p ? { ...p, sourceUrl: e.target.value } : p))}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Topics (comma separated)</label>
              <Input
                value={editing.topics.join(", ")}
                onChange={(e) =>
                  setEditing((p) =>
                    p
                      ? {
                          ...p,
                          topics: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        }
                      : p
                  )
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea value={editing.content} onChange={(e) => setEditing((p) => (p ? { ...p, content: e.target.value } : p))} className="min-h-[220px]" />
              <p className="text-xs text-foreground/60">Saving will re-chunk and re-embed this document.</p>
            </div>

            <div className="flex gap-2 md:col-span-2">
              <Button onClick={saveEdit} disabled={isSavingEdit}>
                {isSavingEdit ? "Saving…" : "Save changes"}
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)} disabled={isSavingEdit}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                    {(d.approvedAt || d.approvedByUserId) && (
                      <div className="mt-1 text-xs text-foreground/60">
                        Approved {d.approvedAt ? new Date(d.approvedAt).toLocaleString() : "—"}{" "}
                        {d.approvedByUserId ? `by ${d.approvedByUserId}` : ""}
                      </div>
                    )}
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
                  <div className="flex gap-2">
                    {d.status === "staging" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => promoteActivate(d.id)}
                          disabled={isLoading}
                        >
                          Activate
                        </Button>
                        {d.tier === "T3" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => promoteApproveT3ToT2(d.id)}
                            disabled={isLoading}
                          >
                            Approve → T2
                          </Button>
                        )}
                      </>
                    )}
                    <Button variant="outline" size="sm" onClick={() => startEdit(d.id)} disabled={isLoading}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteDoc(d.id)} disabled={isLoading}>
                      Delete
                    </Button>
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

