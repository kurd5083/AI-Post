import apiClient from "./apiClient";

export const getChannelFolders = async (telegramId) => {
  const response = await apiClient.get(`/api/v1/channels/folders`, telegramId);

  return response.data;
};
