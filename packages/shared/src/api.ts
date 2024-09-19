import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { API_URL } from './constants';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('pagebrothers-token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
export default api;
