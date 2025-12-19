import apiClient from "@/api/apiClient";

export const getImagePresets = async () => {
  const response = await apiClient.get("/image-generation/presets");
  return response.data;
};
