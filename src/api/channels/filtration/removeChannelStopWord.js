import apiClient from "@/api/apiClient";
 
export const removeChannelStopWord = async (channelId, stopWord) => {
  const response = await apiClient.delete(
    `/channels/${channelId}/stopwords/`, { data: { stopWord } }
  );
  return response.data; 
};  