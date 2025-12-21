import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChannelPosting } from "@/api/channels/toggleChannelPosting";

export const useToggleChannelPosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => toggleChannelPosting(channelId),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};
