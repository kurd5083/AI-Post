import apiClient from "@/api/apiClient";

export const getPersonalNewsFeedId = async (id) => {
  const response = await apiClient.get(`/personal-news-feed/${id}`);
  return response.data;
};