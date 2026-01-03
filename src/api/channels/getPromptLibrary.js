import apiClient from "@/api/apiClient";

export const getPromptLibrary = async () => {
  const response = await apiClient.get("/prompt-library");
  return response.data;
};
