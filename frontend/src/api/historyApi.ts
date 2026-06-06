import axios from 'axios';
import { HistoryItem } from '../types/history';

const ENV = import.meta.env.VITE_ENV;
const API_BASE_URL =
  ENV == 'DEVELOPMENT'
    ? 'http://localhost:5225/api'
    : `${import.meta.env.VITE_BASEURL}/api`;

export const fetchDebugHistory = async (): Promise<HistoryItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/debug/history`);

  return response.data.data;
};
