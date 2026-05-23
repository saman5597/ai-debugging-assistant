import OpenAI from 'openai';
import { DebugRequestInput } from '../schemas/debug.schema';
import { DebugAnalysisResponse } from '../types/debug.types';
import { aiDebugResponseSchema } from '../schemas/ai-response.schema';

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing in environment variables');
  }

  return new OpenAI({
    apiKey,
  });
};

export const analyzeErrorWithAI = async (
  input: DebugRequestInput
): Promise<DebugAnalysisResponse> => {
  const openai = getOpenAIClient();

  const prompt = buildDebugPrompt(input);

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `
You are a senior software debugging assistant.

You must return ONLY valid JSON.
Do not include markdown.
Do not include code fences.
Do not include explanations outside JSON.
Do not include trailing commas.
Do not include comments.

The JSON must match this TypeScript type:

{
  "summary": string,
  "rootCause": string,
  "severity": "low" | "medium" | "high" | "critical",
  "confidenceScore": number,
  "suggestedFix": string,
  "improvedCode": string,
  "preventionTips": string[],
  "followUpQuestions": string[]
}

Rules:
- confidenceScore must be between 0 and 1.
- severity must be one of: low, medium, high, critical.
- If code is missing, improvedCode can be an empty string.
- If context is insufficient, add useful followUpQuestions.
- Do not invent details that are not present.
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No response from AI');
  }

  try {
    const parsedJson = JSON.parse(content);
    const validatedResponse = aiDebugResponseSchema.parse(parsedJson);

    return validatedResponse as DebugAnalysisResponse;
  } catch (error) {
    console.error('AI response parsing/validation failed:', {
      rawContent: content,
      error: error instanceof Error ? error.message : error,
    });

    throw new Error('Failed to parse or validate AI response');
  }
};

const buildDebugPrompt = (input: DebugRequestInput) => {
  return `
Analyze this debugging issue.

Language:
${input.language}

Framework:
${input.framework || 'Not provided'}

Error Message:
${input.errorMessage}

Stack Trace:
${input.stackTrace || 'Not provided'}

Code Snippet:
${input.codeSnippet || 'Not provided'}

Return JSON in this exact format:

{
  "summary": "Short explanation of the issue",
  "rootCause": "Most likely root cause",
  "severity": "low",
  "confidenceScore": 0.8,
  "suggestedFix": "Clear fix explanation",
  "improvedCode": "Corrected code if applicable, otherwise empty string",
  "preventionTips": ["tip 1", "tip 2"],
  "followUpQuestions": ["question 1", "question 2"]
}
`;
};
