import apiClient from "@/api/apiClient";

export const getUserBalance = async () => {
  const response = await apiClient.get('/balance');
  return response.data;
};
