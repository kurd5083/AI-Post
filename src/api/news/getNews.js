import apiClient from "@/api/apiClient";

export const getNews = async (filter) => {
  const response = await apiClient.get("/news", filter);
  return response.data;
};
