import apiClient from "@/api/apiClient";

export const createConfigСhannel = async (data) => {
  const response = await apiClient.patch(`/promotion/config/channel`, data);
  return response.data;
};