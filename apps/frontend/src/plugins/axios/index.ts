import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false, // para que cookies httpOnly se envíen automáticamente
});

api.interceptors.request.use(config => {
  const token = useAuthStore().token;
  if (token) {
    console.log("import.meta.env.VITE_API_BASE_URL,n", import.meta.env.VITE_API_BASE_URL,)
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    if (error.response?.status === 401 && authStore.refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authStore.refreshTokenm();
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`;
        return api.request(originalRequest);
      } catch (err) {
        authStore.logout();
        // throw err;
      }
    }

    return Promise.reject(error);

  }
);

export default api;
