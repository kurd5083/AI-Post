import apiClient from "./apiClient";

export const getChannelFolders = async () => {
  const response = await apiClient.get(`/channels/folders`);
  return response.data;
};
