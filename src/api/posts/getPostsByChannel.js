import apiClient from "@/api/apiClient";

export const getPostsByChannel = async (channelId) => {
  const response = await apiClient.get(`/posts/by-channel/${channelId}`);
  return response.data;
};
