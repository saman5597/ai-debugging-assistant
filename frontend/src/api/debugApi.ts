import axios from 'axios';
import { DebugAnalysisResponse, DebugRequestPayload } from '../types/debug';

const API_BASE_URL = 'http://localhost:5225/api';

export const analyzeDebugIssue = async (
  payload: DebugRequestPayload
): Promise<DebugAnalysisResponse> => {
  const response = await axios.post(`${API_BASE_URL}/debug/analyze`, payload);
  return response.data.data;
};

export const mockAnalyzeDebugIssue =
  async (): Promise<DebugAnalysisResponse> => {
    const response = await axios.post(`${API_BASE_URL}/debug/mock-analyze`, {});
    return response.data.data;
  };
