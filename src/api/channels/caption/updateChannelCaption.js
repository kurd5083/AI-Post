import apiClient from "@/api/apiClient";

export const updateChannelCaption = async (channelId, value) => {
  console.log(channelId, value)
  const response = await apiClient.patch(`/channels/${channelId}/caption`, {value});
  return response.data;
};