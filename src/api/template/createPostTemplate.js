import apiClient from "@/api/apiClient";

export const createPostTemplate = async (templateData) => {
  const response = await apiClient.post("/post-templates", templateData);
  return response.data;
};
