import apiClient from "@/api/apiClient";

export const createPostTemplate = async (dataToSend) => {
  const response = await apiClient.post("/post-templates", dataToSend);
  return response.data;
};
