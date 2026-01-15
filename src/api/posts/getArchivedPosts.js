import apiClient from "@/api/apiClient";

export const getArchivedPosts = async (channelId) => {
  const response = await apiClient.get("/posts/archived", channelId);
  return response.data;
};
