import apiClient from "@/api/apiClient";

export const addPostImagesMedia = async (postId, { images, imageNames }) => {
  const formData = new FormData();
  images.forEach(image => formData.append("images", image));
  imageNames.forEach(name => formData.append("imageNames", name));
  
  const response = await apiClient.post(`/posts/${postId}/images`, formData);
  return response.data;
};