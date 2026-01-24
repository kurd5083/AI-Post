import apiClient from "@/api/apiClient";

export const addPostImagesMedia = async (postId, { images, imageUrl }) => {
  const formData = new FormData();
  images.forEach(image => formData.append("images", image));
  formData.append("imageUrls", imageUrl);
  
  const response = await apiClient.post(`/posts/${postId}/images`, formData);
  return response.data;
};