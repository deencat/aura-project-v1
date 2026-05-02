import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const runs = await prisma.ingestionRun.findMany({
    orderBy: [{ startedAt: "desc" }],
    take: 30,
    select: {
      id: true,
      status: true,
      startedAt: true,
      endedAt: true,
      stats: true,
      errorLog: true,
    },
  })

  return NextResponse.json({ ok: true, runs })
}

