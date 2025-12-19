import apiClient from "@/api/apiClient";

export const getChannelInterval = async (channelId) => {
    console.log(channelId)
  const response = await apiClient.get(`/channel-interval/${channelId}`);
  return response.data;
};