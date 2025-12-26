import apiClient from "@/api/apiClient";

export const addChannelStopWord = async (channelId, stopWord) => {
  const response = await apiClient.post(`/channels/${channelId}/stopwords`, { stopWord });
  return response.data;
};