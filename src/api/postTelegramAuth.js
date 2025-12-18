import apiClient from './apiClient';

export const postTelegramAuth = async (data) => {
  console.log(data)
  const response = await apiClient.post('/users/auth/telegram', data)
  return response.data; 
};
