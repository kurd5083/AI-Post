import apiClient from "@/api/apiClient";

export const getPostTemplateCategories = async () => {
  const response = await apiClient.get("/post-templates/categories");
  return response.data;
};