import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeChannelStopword } from "@/api/channels/filtering/removeChannelStopword";

export const useRemoveChannelStopword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, stopword }) => removeChannelStopword(channelId, stopword),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel"]);
    },
  });
};