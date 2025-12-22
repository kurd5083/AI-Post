import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeChannelKeyword } from "@/api/channels/filtration/removeChannelKeyword";

export const useRemoveChannelKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, keyword }) => removeChannelKeyword(channelId, keyword),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};