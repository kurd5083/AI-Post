import apiClient from "@/api/apiClient";

export const deletePost = async (postId) => {
  const response = await apiClient.delete(`/posts/${postId}`);
  return response.data;
};
