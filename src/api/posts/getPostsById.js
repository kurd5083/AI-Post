import apiClient from "@/api/apiClient";

export const getPostsById = async (id) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};
