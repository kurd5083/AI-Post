import apiClient from "@/api/apiClient";

export const deletePostTemplate = async (id) => {
  const response = await apiClient.delete(`/post-templates/${id}`);
  return response.data;
};