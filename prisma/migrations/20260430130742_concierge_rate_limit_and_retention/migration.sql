-- CreateTable
CREATE TABLE "RateLimitCounter" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "windowId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimitCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConciergeRequestEvent" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "locale" TEXT,
    "ipHash" TEXT NOT NULL,
    "userId" TEXT,
    "statusCode" INTEGER NOT NULL,
    "rateLimited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConciergeRequestEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RateLimitCounter_windowId_idx" ON "RateLimitCounter"("windowId");

-- CreateIndex
CREATE INDEX "RateLimitCounter_updatedAt_idx" ON "RateLimitCounter"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimitCounter_key_windowId_key" ON "RateLimitCounter"("key", "windowId");

-- CreateIndex
CREATE INDEX "ConciergeRequestEvent_createdAt_idx" ON "ConciergeRequestEvent"("createdAt");

-- CreateIndex
CREATE INDEX "ConciergeRequestEvent_route_createdAt_idx" ON "ConciergeRequestEvent"("route", "createdAt");

-- CreateIndex
CREATE INDEX "ConciergeRequestEvent_userId_createdAt_idx" ON "ConciergeRequestEvent"("userId", "createdAt");
