import apiClient from "@/api/apiClient";

export const authTelegram = async (data) => {
  const response = await apiClient.post('/users/auth/telegram', data)
  return response.data; 
};
