import apiClient from "@/api/apiClient";

export const updateChannelInterval = async (channelId, data) => {
  const response = await apiClient.post(`/channel-interval/${channelId}`, data);
  return response.data;
};
