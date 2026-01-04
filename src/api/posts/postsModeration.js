import apiClient from "@/api/apiClient";

export const postsModeration = async (postId, channelId) => {
  const response = await apiClient.post(`/posts/queue/moderation/approve/${postId}/${channelId}`);
  return response.data;
};