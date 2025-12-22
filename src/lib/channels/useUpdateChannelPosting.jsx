import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableChannelPosting, disableChannelPosting } from "@/api/channels/updateChannelPosting";

export const useEnableChannelPosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => enableChannelPosting(channelId),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};
export const useDisableChannelPosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => disableChannelPosting(channelId),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};
