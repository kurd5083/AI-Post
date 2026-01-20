import apiClient from "@/api/apiClient";

export const register = async (data) => {
  const response = await apiClient.post('/users/auth/register', data)
  return response.data; 
};

