import apiClient from './apiClient';

export const telegramAuth = async (data) => {
  const response = await apiClient.post('/users/auth/telegram', data)
  return response.data; 
};
