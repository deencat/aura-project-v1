import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { seedHongKongKnowledgePack } from "@/services/knowledge.service"

export async function POST(_: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const result = await seedHongKongKnowledgePack({ language: "zh-HK", mode: "starter" })
  return NextResponse.json({ ok: true, ...result })
}

