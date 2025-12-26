import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeChannelStopWord } from "@/api/channels/filtration/removeChannelStopWord";

export const useRemoveChannelStopWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, stopWord }) => removeChannelStopWord(channelId, stopWord),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};