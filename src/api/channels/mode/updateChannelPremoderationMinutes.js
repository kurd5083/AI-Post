import apiClient from "@/api/apiClient";

export const updateChannelPremoderationMinutes = async (channelId) => {
  const response = await apiClient.patch(`/channels/${channelId}/premoderation-minutes`);
  return response.data;
};