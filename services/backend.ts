import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

type AxiosFunction = <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
type AxiosDataFunction = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

export function backendService() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!baseURL) {
    throw new Error('NEXT_PUBLIC_API_URL env variable is not set');
  }

  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
  });

  instance.interceptors.response.use(
    async (response) => {
      return response.data as any;
    },
    async (error) => {
      if (error.response.status === 401) {
        Cookies.remove('access-token');
        window.location.href = '/login';
      }

      return Promise.reject(error);
    },
  );

  return {
    get: instance.get as AxiosFunction,
    post: instance.post as AxiosDataFunction,
    delete: instance.delete as AxiosFunction,
    put: instance.put as AxiosDataFunction,
    patch: instance.patch as AxiosDataFunction,
  };
}

export const backend = backendService();
