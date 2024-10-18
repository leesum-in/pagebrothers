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

const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com/v2',
});

kakaoApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers.set(
      'Authorization',
      `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_REST_API_KEY}`,
    );
  }
  return config;
});

kakaoApi.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export { api, kakaoApi };
