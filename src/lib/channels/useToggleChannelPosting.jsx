import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChannelPosting } from "@/api/channels/toggleChannelPosting";

export const useToggleChannelPosting = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleChannelPosting(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};
