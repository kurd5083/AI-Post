import apiClient from "@/api/apiClient";

export const getNews = async (filters) => {
  const response = await apiClient.get("/news", { params: filters });

  return response.data;
};