import apiClient from "@/api/apiClient";

export const archivePost = async (postId) => {
    console.log(postId, 'postId')
  const response = await apiClient.post(`/posts/${postId}/archive`);
  return response.data;
};