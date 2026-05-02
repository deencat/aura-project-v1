"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type RetentionResponse = {
  ok: boolean
  retentionDays?: number
  cutoff?: string
  deleted?: {
    conciergeMessages: number
    conciergeThreads: number
    conciergeRequestEvents: number
    rateLimitCounters: number
  }
  error?: string
}

export default function AdminConciergeOpsPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RetentionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function runRetention() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/admin/concierge/retention/run", {
        method: "POST",
        credentials: "include",
      })
      const data = (await res.json()) as RetentionResponse
      if (!res.ok) {
        setError(data?.error === "unauthorized" ? "請先登入。" : `Request failed (${res.status})`)
        setResult(data)
        return
      }
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Concierge ops</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          手動執行與 cron 相同的對話紀錄清理（依 <code className="text-xs">CONCIERGE_RETENTION_DAYS</code>，預設
          180 日）。刪除舊訊息、線程、濫用事件紀錄及過期 rate limit 計數。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retention cleanup</CardTitle>
          <CardDescription>
            生產環境建議仍由 Hostinger cron 或排程呼叫公開端點；此處方便管理員在後台即時執行。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runRetention} disabled={loading}>
            {loading ? "執行中…" : "立即執行 retention 清理"}
          </Button>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          {result?.ok && result.deleted ? (
            <div className="rounded-md border bg-muted/40 p-4 text-sm">
              <p className="font-medium">完成</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                <li>Retention window: {result.retentionDays} days</li>
                <li>Cutoff: {result.cutoff}</li>
                <li>Deleted messages: {result.deleted.conciergeMessages}</li>
                <li>Deleted threads: {result.deleted.conciergeThreads}</li>
                <li>Deleted request events: {result.deleted.conciergeRequestEvents}</li>
                <li>Deleted rate limit rows: {result.deleted.rateLimitCounters}</li>
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
