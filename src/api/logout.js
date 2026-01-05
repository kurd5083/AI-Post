import apiClient from "@/api/apiClient";

export const logout = async () => {
  const response = await apiClient.post("/users/auth/logout");
  return response.data;
};