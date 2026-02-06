import apiClient from "@/api/apiClient";

export const getPersonalNewsFeedId = async () => {
  const response = await apiClient.get(`/personal-news-feed`);
  return response.data;
};