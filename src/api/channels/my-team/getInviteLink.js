import apiClient from "@/api/apiClient";

export const getInviteLink = async (channelId) => {
  const response = await apiClient.get("/channel-members/invite/link", {
    params: { channelId: Number(channelId) }
  });
  return response.data;
};