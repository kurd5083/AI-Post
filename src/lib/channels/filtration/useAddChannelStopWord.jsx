import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChannelStopWord } from "@/api/channels/filtration/addChannelStopWord";

export const useAddChannelStopWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, stopWord }) => addChannelStopWord(channelId, stopWord),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};