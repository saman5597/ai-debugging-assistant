-- CreateTable
CREATE TABLE "DebugReport" (
    "id" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "stackTrace" TEXT,
    "codeSnippet" TEXT,
    "language" TEXT NOT NULL,
    "framework" TEXT,
    "summary" TEXT NOT NULL,
    "rootCause" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,
    "suggestedFix" TEXT NOT NULL,
    "improvedCode" TEXT,
    "preventionTips" JSONB NOT NULL,
    "followUpQuestions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebugReport_pkey" PRIMARY KEY ("id")
);
