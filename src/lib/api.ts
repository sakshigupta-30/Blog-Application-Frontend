import axios, { AxiosInstance } from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL as string | undefined;

if (!API_URL) {
  // In development it's useful to have a clear message; do not silently fall back in production.
  console.warn('[api] VITE_API_URL is not set. Requests may fail. Set VITE_API_URL in client/.env');
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;