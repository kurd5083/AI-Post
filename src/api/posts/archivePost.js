import apiClient from "@/api/apiClient";

export const archivePost = async (postId) => {
  const response = await apiClient.post(`/posts/${postId}/archive`);
  return response.data;
};