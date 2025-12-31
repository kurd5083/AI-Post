import apiClient from "@/api/apiClient";

export const removeInviteLink = async (linkId) => {
  const response = await apiClient.delete(`/channel-invite-links/${linkId}`);
  return response.data;
};
