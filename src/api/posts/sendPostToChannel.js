import apiClient from "@/api/apiClient";

export const sendPostToChannel = async ({ postId, channelId, channelTelegramId }) => {
  const response = await apiClient.post("/channels/send", { postId, channelId, channelTelegramId });
  return response.data;
};
