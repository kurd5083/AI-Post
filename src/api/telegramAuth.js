import apiClient from './apiClient';

export const telegramAuth = async (data) => {
  console.log(data)
  const response = await apiClient.post('http://77.37.65.40:3000/api/v1/users/auth/telegram', data);
  return response.data; 
};
