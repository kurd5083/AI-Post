import apiClient from "@/api/apiClient";

export const getGetPostTemplates = async (category) => {
  const response = await apiClient.get("/post-templates", {category});
  return response.data;
};
