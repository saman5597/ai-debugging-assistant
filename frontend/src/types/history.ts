export interface HistoryItem {
  id: string;
  errorMessage: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  language: string;
  framework?: string;
  createdAt: string;
}
