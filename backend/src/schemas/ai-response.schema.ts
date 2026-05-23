import { z } from 'zod';

export const aiDebugResponseSchema = z.object({
  summary: z.string(),
  rootCause: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  confidenceScore: z.number().min(0).max(1),
  suggestedFix: z.string(),
  improvedCode: z.string().optional(),
  preventionTips: z.array(z.string()),
  followUpQuestions: z.array(z.string()).optional(),
});
