export type DebugAnalysisResponse = {
  summary: string;
  rootCause: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidenceScore: number;
  suggestedFix: string;
  improvedCode?: string;
  preventionTips: string[];
  followUpQuestions?: string[];
};
