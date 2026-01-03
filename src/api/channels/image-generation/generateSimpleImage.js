import apiClient from "@/api/apiClient";

export const generateSimpleImage = async (prompt) => {
  const response = await apiClient.post("/image-generation/generate-simple", { prompt });
  return response.data;
};
