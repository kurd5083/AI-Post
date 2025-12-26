import apiClient from "@/api/apiClient";

export const createPost = async (postData) => {
  const response = await apiClient.post("/posts/create", postData);
  return response.data;
};