import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://77.37.65.40:3000/api',
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      console.warn('Требуется авторизация. Перенаправляем на login...');
    }
    return Promise.reject(new Error(error.response?.data?.message || 'Произошла ошибка'));
  }
);

export default apiClient;
