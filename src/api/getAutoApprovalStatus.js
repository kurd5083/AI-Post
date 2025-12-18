import apiClient from './apiClient';

export const getAutoApprovalStatus = async (channelId) => {
  console.log(channelId, '123aaaaaaaaa123123')
  const response = await apiClient.get(`/channels/auto-approval/status/${channelId}`);
  return response.data;
};
export const updateAutoApprovalStatus = async (channelId) => {
  console.log(channelId, '123123123')
  const response = await apiClient.put(`/channels/auto-approval/status/${channelId}`);
  return response.data;
};