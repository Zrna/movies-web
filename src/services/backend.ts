import axios, { AxiosRequestConfig } from 'axios';

type AxiosFunction = <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
type AxiosDataFunction = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;

export function backendService() {
  const baseURL = process.env.NODE_ENV === 'production' ? 'http://localhost:5000' : 'http://localhost:5000';

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

  instance.interceptors.response.use(async (response) => {
    return response.data as any;
  });

  return {
    get: instance.get as AxiosFunction,
    post: instance.post as AxiosDataFunction,
    delete: instance.delete as AxiosFunction,
    put: instance.put as AxiosDataFunction,
    patch: instance.patch as AxiosDataFunction,
  };
}

export const backend = backendService();
