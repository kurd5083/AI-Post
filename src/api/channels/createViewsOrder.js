import apiClient from "@/api/apiClient";

export const createViewsOrder = async (data) => {
  const response = await apiClient.post(`/promotion/views/orders`, data);
  return response.data;
};
