import apiClient from "@/api/apiClient";

export const addChannelSource = async (channelId, url) => {
  const response = await apiClient.post(`/channel-sources/channel/21/add`, {
  "url": "https://t.me/durov"
});
  return response.data;
};
