import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env.config';
import { APP_ROUTES } from '@/constants/app/app.constants';
import { getAuthToken, useAuthStore } from '@/stores/auth/auth.store';
import type { ApiValidationError } from '@/types/api-response.type';

export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.set('X-Requested-With', 'XMLHttpRequest');
    const token = getAuthToken();
    if (token) config.headers.set('Authorization', `Bearer ${token}`);
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiValidationError>) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Tempo limite da requisição excedido'));
    }

    if (!error.response) {
      return Promise.reject(new Error('Não foi possível conectar à API'));
    }

    if (error.response.status === 401) {
      const path = error.config?.url || '';
      if (!path.includes('/auth/login')) {
        useAuthStore.getState().clearSession();
        if (typeof window !== 'undefined' && window.location.pathname !== APP_ROUTES.login) {
          window.location.assign(APP_ROUTES.login);
        }
      }
    }

    return Promise.reject(error);
  },
);
