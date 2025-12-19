import apiClient from "@/api/apiClient";

export const getChannelInterval = async (channelId) => {
    console.log(channelId)
  const response = await apiClient.get(`/channel-interval/16`);
  return response.data;
};