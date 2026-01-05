import apiClient from "@/api/apiClient";

export const updateChannelPremoderationMinutes = async (channelId, minutes) => {
  const response = await apiClient.patch(`/channels/${channelId}/premoderation-minutes`, {minutes});
  return response.data;
};