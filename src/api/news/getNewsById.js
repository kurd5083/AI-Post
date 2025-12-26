import apiClient from "@/api/apiClient";

export const getNewsById = async (id) => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
};
