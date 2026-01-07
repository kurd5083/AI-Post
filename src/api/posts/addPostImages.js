import apiClient from "@/api/apiClient";

export const addPostImages = async (postId, images) => {
  const formData = new FormData();
  images.forEach(image => formData.append("images", image));
  const response = await apiClient.post(`/posts/${postId}/images`, formData);
  return response.data;
};