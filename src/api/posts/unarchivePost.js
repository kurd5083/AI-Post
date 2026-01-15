import apiClient from "@/api/apiClient";

export const unarchivePost = async (postId) => {
  const response = await apiClient.post(`/posts/${postId}/unarchive`);
  return response.data;
};