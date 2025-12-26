import apiClient from "@/api/apiClient";

export const getChannelsGroupedByFolders = async () => {
  const response = await apiClient.get('/channels/grouped-by-folders');
  return response.data;
};