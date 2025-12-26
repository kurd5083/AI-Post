import apiClient from "@/api/apiClient";

export const getChannelImagePreset = async (channelId) => {
  const response = await apiClient.get(`/image-generation/channels/${channelId}/preset`);
  return response.data;
};