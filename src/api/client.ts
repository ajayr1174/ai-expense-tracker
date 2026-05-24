import axios, { AxiosError } from 'axios';
import { config } from '@/constants/config';

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeoutMs,
  headers: config.api.defaultHeaders,
});

apiClient.interceptors.request.use(
  config => {
    if (authToken) {
      const headers = config.headers as Record<string, string> | undefined;
      config.headers = {
        ...headers,
        Authorization: `Bearer ${authToken}`,
      } as any;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Optional: add logout or refresh token handling here.
    }
    return Promise.reject(error);
  },
);

export default apiClient;
