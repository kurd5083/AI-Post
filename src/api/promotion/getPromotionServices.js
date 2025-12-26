import apiClient from "@/api/apiClient";

export const getPromotionServices = async () => {
  const response = await apiClient.get("/promotion/services");
  return response.data;
};