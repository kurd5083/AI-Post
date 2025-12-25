import apiClient from "@/api/apiClient"; 

export const getTelegramBotInfo = async () => {
  const response = await apiClient.get("/users/telegram/bot-info");
  return response.data;
};
