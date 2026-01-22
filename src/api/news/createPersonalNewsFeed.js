import apiClient from "@/api/apiClient";

export const createPersonalNewsFeed = async (data) => {
    console.log(data);
    const response = await apiClient.post(`/personal-news-feed/`, data);
    return response.data;
};
