import apiClient from "@/api/apiClient";

export const updateChannelImagePreset = async (channelId, data) => {
  const response = await apiClient.put(`/image-generation/channels/${channelId}/preset`, data);
  return response.data;
};