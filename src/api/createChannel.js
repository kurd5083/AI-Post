import apiClient from "@/api/apiClient";

export const createChannel = async (channelData) => {
  const response = await apiClient.post("/channels", channelData);
  return response.data;
};