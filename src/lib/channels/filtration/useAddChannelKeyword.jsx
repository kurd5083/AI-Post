import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChannelKeyword } from "@/api/channels/filtration/addChannelKeyword";

export const useAddChannelKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, keyword }) => addChannelKeyword(channelId, keyword),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};