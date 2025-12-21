import apiClient from '../apiClient';

export const getAutoApprovalStatus = async (channelId) => {
  const response = await apiClient.get(`/channels/auto-approval/status/${channelId}`);
  return response.data;
};
export const updateAutoApprovalStatus = async (channelId, autoApprovalEnabled) => {
  const response = await apiClient.put(`/channels/auto-approval/status/${channelId}`, {
      autoApprovalEnabled 
  });
  return response.data;
};