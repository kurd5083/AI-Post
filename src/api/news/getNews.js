import apiClient from "@/api/apiClient";

export const getNews = async (filter) => {
  console.log(filter)
  const response = await apiClient.get("/news", {
    params: filter,
  });

  return response.data;
};