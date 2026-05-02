import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { executeConciergeRetention } from "@/services/concierge-retention.service"

/**
 * Clerk-protected manual run of the same retention job as GET/POST /api/concierge/retention/run.
 */
export async function POST() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const result = await executeConciergeRetention()
  return NextResponse.json(result)
}
