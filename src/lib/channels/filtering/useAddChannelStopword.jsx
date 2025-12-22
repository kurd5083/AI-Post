import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChannelStopword } from "@/api/channels/filtering/addChannelStopword";

export const useAddChannelStopword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, stopword }) => addChannelStopword(channelId, stopword),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel"]);
    },
  });
};