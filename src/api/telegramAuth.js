import apiClient from './apiClient';

export const telegramAuth = async (data) => {
  const response = await apiClient.post('/v1/users/auth/telegram', data);
  return response.data; 
};
