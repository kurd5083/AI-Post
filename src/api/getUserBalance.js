import apiClient from './apiClient';

export const getUserBalance = async () => {
  const response = await apiClient.get('/balance');
  return response.data;
};
