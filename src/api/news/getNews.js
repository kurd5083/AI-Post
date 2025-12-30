import apiClient from "@/api/apiClient";

export const getNews = async (filters) => {
  console.log(filters) 

  const response = await apiClient.get("/news", {
    params: filters,
    headers: {
    "Cache-Control": "no-cache",
  },
  });

  return response.data;
};