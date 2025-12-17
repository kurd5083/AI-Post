import apiClient from './apiClient';

export const getChannelsGroupedByFolders = async () => {
  const response = await apiClient.get('/channels/grouped-by-folders');
  return response.data;
};