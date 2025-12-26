import apiClient from "@/api/apiClient";

export const getAvailableCategories = async () => {
  const response = await apiClient.get("/channel-sources/categories/available");
  return response.data;
};
