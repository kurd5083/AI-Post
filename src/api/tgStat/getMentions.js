import apiClient from "@/api/apiClient";

export const getMentions = async (channelId, limit = 20) => {
  if (!channelId) return null;

  const response = await apiClient.get("/tg-stat/mentions", {
    params: {
      channelId,
      limit,
    },
  });

  return response.data;
};
