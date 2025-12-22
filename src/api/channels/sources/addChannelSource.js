import apiClient from "@/api/apiClient";

export const addChannelSource = async (channelId, url) => {
    console.log(channelId, url)
  const response = await apiClient.post(`/channel-sources/channel/${channelId}/add`, { url });
  return response.data;
};
