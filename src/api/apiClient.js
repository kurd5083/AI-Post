import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://77.37.65.40:3000/api/v1',
  headers: { Accept: 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(new Error(error.response?.data?.message || 'Произошла ошибка'))
);

export default apiClient;
