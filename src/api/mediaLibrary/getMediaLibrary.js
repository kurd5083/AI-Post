import apiClient from "@/api/apiClient";

export const getMediaLibrary = async () => {
  const response = await apiClient.get("/media-library");
  return response.data;
};
