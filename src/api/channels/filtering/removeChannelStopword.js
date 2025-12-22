import apiClient from "@/api/apiClient";

export const removeChannelStopword = async ({ channelId, stopword }) => {
  const response = await apiClient.delete(`/channels/${channelId}/stopwords/${stopword}`);
  return response.data;
};