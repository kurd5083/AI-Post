import apiClient from "@/api/apiClient";

export const updateMediaMetadata = async (id, data) => {
  const response = await apiClient.patch(`/media-library/${id}`, data);
  return response.data;
};