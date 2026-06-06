import axios from 'axios';

const ENV = import.meta.env.VITE_ENV;
const API_BASE_URL =
  ENV == 'DEVELOPMENT'
    ? 'http://localhost:5225/api'
    : `${import.meta.env.VITE_BASEURL}/api`;

export const fetchDebugReport = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/debug/report/${id}`);

  return response.data.data;
};
