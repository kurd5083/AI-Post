import apiClient from "@/api/apiClient";

export const deleteChannelSource = async (channelId, sourceId) => {
    console.log(channelId, sourceId)
  const response = await apiClient.delete(`/channel-sources/channel/${channelId}/source/${sourceId}`);
  return response.data;
};