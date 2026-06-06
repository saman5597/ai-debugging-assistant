import axios from 'axios';
import { DebugAnalysisResponse, DebugRequestPayload } from '../types/debug';

const ENV = import.meta.env.VITE_ENV;
const API_BASE_URL =
  ENV == 'DEVELOPMENT'
    ? 'http://localhost:5225/api'
    : `${import.meta.env.VITE_BASEURL}/api`;

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
