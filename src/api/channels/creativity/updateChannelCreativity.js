import apiClient from "@/api/apiClient";

export const updateChannelCreativity = async (channelId, value) => {
  const response = await apiClient.patch(`/channels/${channelId}/creativity`, value);
  return response.data;
};