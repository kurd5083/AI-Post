import apiClient from "@/api/apiClient";

export const deleteMediaFile = async (id) => {
  const response = await apiClient.delete(`/media-library/${id}`);
  return response.data;
};