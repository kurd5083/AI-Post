import apiClient from "@/api/apiClient";

export const updateAutoApprovalStatus = async (channelId, autoApprovalEnabled ) => {
  const response = await apiClient.put(`/channels/auto-approval/status/${channelId}`, {autoApprovalEnabled});
  return response.data;
};