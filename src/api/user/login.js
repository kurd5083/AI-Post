import apiClient from "@/api/apiClient";

export const login = async (data) => {
  const response = await apiClient.post('/users/auth/login', data)
  return response.data; 
};

