import apiClient from "@/api/apiClient";

export const createPersonalNewsFeed = async (data) => {
    const response = await apiClient.post(`/personal-news-feed/`, data);
    return response.data;
};
