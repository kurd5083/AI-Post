import apiClient from "@/api/apiClient";

export const updatePost = async (postId, postData) => {
  const response = await apiClient.patch(`/posts/${postId}`, postData);
  return response.data;
};