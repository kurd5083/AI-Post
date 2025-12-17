import apiClient from './apiClient';

export const telegramAuth = async (data) => {
  console.log(data)
  const response = await apiClient.post('/api/users/auth/telegram', data);
  return response.data; 
};
