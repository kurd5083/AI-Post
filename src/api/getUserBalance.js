import apiClient from './apiClient';

export const getUserBalance = async () => {
  const response = await apiClient.get('/v1/balance');
  return response.data;
};
