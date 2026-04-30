-- CreateTable
CREATE TABLE "ConciergeThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConciergeThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConciergeMessage" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sources" JSONB,
    "rollupSources" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConciergeMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConciergeThread_userId_locale_updatedAt_idx" ON "ConciergeThread"("userId", "locale", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "ConciergeThread_userId_updatedAt_idx" ON "ConciergeThread"("userId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "ConciergeMessage_threadId_createdAt_idx" ON "ConciergeMessage"("threadId", "createdAt");

-- AddForeignKey
ALTER TABLE "ConciergeMessage" ADD CONSTRAINT "ConciergeMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ConciergeThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
