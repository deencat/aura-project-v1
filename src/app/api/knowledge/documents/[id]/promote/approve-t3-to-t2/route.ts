import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function POST(_: Request, ctx: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })

  const id = ctx.params.id
  const doc = await prisma.knowledgeDocument.findUnique({
    where: { id },
    select: { id: true, tier: true, status: true },
  })
  if (!doc) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 })

  if (doc.tier !== "T3" || doc.status !== "staging") {
    return NextResponse.json(
      { ok: false, error: "invalid_state", message: "Only T3 staging documents can be approved into T2." },
      { status: 400 }
    )
  }

  const updated = await prisma.knowledgeDocument.update({
    where: { id },
    data: {
      tier: "T2",
      status: "active",
      approvedAt: new Date(),
      approvedByUserId: userId,
    },
    select: { id: true, tier: true, status: true, approvedAt: true, approvedByUserId: true, updatedAt: true },
  })

  return NextResponse.json({ ok: true, document: updated })
}

