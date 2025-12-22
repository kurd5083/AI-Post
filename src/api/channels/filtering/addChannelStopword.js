import apiClient from "@/api/apiClient";

export const addChannelStopword = async (channelId, stopword) => {
  const response = await apiClient.post(`/channels/${channelId}/stopwords`, { stopword });
  return response.data;
};