import apiClient from "@/api/apiClient";

export const rejectPost = async (postId, channelId) => {
  const response = await apiClient.post(`/posts/queue/moderation/reject/${postId}/${channelId}`);
  return response.data;
};