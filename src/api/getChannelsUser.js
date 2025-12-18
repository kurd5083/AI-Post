import apiClient from './apiClient';

export const getChannelsUser = async () => {
  const response = await apiClient.get('/channels/user');
  return response.data;
};