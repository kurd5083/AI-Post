import apiClient from './apiClient';

export const getUserBalance = async () => {
  const response = await apiClient.get('/promotion/balance');
  return response.data;
};
