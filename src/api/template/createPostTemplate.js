import apiClient from "@/api/apiClient";

export const createPostTemplate = async (templateData) => {
    console.log(templateData, 'asgahd')
  const response = await apiClient.post("/post-templates", templateData);
  return response.data;
};
