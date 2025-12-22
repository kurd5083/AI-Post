import apiClient from "@/api/apiClient";

export const updateChannelField = async (channelId, field) => {
    console.log(channelId, field)
  const response = await apiClient.patch(`/channels/${channelId}/${field}/toggle`);
  return response.data;
};
