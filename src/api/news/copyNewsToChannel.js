import apiClient from "@/api/apiClient";

export const copyNewsToChannel = async (id, data) => {
    console.log(id, data)
  const response = await apiClient.post(`/news/${id}/copy-to-channel`, data);
  return response.data;
};
