import apiClient from "@/api/apiClient";
 
export const removeChannelStopWord = async (channelId, stopWord) => {
  console.log(channelId, stopWord)
  const response = await apiClient.delete(`/channels/${channelId}/stopwords/${stopWord}`);
  return response.data; 
};  