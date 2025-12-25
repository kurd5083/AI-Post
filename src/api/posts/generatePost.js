import apiClient from "@/api/apiClient";

export const generatePost = async (channelId) => {
  const response = await apiClient.post("/prompt", {channelId});
  return response.data;
};
