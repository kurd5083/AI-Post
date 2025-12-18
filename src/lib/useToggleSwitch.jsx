import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";

export const useToggleSwitch = (channelId, type) => {
  return useMutation(async (enabled) => {
    if (type === "autoApproval") {
      if (enabled) {
        await apiClient.post(`/channels/auto-approval/enable`, { channelIds: [channelId] });
      } else {
        await apiClient.post(`/channels/auto-approval/disable`, { channelIds: [channelId] });
      }
    } else if (type === "promotion") {
      if (enabled) {
        await apiClient.post(`/channels/promotion/enable`, { channelIds: [channelId] });
      } else {
        await apiClient.post(`/channels/promotion/disable`, { channelIds: [channelId] });
      }
    }
    return enabled;
  });
};
