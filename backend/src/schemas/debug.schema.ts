import { z } from 'zod';

export const debugRequestSchema = z.object({
  errorMessage: z.string().min(5, 'Error message is required'),
  stackTrace: z.string().optional(),
  codeSnippet: z.string().optional(),
  language: z.string().min(1, 'Language is required'),
  framework: z.string().optional(),
});

export type DebugRequestInput = z.infer<typeof debugRequestSchema>;
