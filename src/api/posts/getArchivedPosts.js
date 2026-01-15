import apiClient from "@/api/apiClient";

export const getArchivedPosts = async (channelId) => {
  if (!channelId) return [];
  const response = await apiClient.get("/posts/archived", {
    params: { channelId }
  });
  return response.data;
};
