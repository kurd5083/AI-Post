import apiClient from "@/api/apiClient";

export const getTelegramBotLink = async () => {
  const response = await apiClient.get("/users/auth/bot-link");
  return response.data;
};
