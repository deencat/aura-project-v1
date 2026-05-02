-- AlterTable
ALTER TABLE "KnowledgeDocument" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedByUserId" TEXT;

-- CreateIndex
CREATE INDEX "KnowledgeDocument_approvedAt_idx" ON "KnowledgeDocument"("approvedAt");
