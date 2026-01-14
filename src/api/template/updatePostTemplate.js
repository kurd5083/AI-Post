import apiClient from "@/api/apiClient";

export const updatePostTemplate = async (id, data) => {
    console.log(data, 'datadata')
    const response = await apiClient.patch(`/post-templates/${id}`, data);
    return response.data;
};