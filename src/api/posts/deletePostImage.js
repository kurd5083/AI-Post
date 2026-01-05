import apiClient from "@/api/apiClient";

export const deletePostImage = async (postId, imageIndex) => {
  const response = await apiClient.delete(`/posts/${postId}/image/${imageIndex}`);
  return response.data; 
};