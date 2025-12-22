import apiClient from "@/api/apiClient";

export const getChannelCreativity = async (channelId) => {
  const response = await apiClient.get(`/channels/${channelId}/creativity`);
  return response.data;
};