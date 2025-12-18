import apiClient from "./apiClient";

export const getChannelFolders = async (telegramId) => {
  const response = await apiClient.get(`/channels/folders`, telegramId);

  return response.data;
};
