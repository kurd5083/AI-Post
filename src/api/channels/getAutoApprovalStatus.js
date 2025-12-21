import apiClient from '../apiClient';

export const updateAutoApprovalStatus = async (channelId) => {
  const response = await apiClient.put(`/channels/auto-approval/status/${channelId}`);
  return response.data;
};