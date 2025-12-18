import apiClient from "./apiClient";

export const getChannelFolders = async (ownerTelegramId) => {
  const response = await apiClient.get(`/channels/folders`, {
    params: { ownerTelegramId: ownerTelegramId },
  });
  return response.data;
};
