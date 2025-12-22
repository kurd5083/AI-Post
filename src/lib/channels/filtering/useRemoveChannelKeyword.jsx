import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeChannelKeyword } from "@/api/channels/filtering/removeChannelKeyword";

export const useRemoveChannelKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, keyword }) => removeChannelKeyword(channelId, keyword),

    onSuccess: () => {
      queryClient.invalidateQueries(["channel"]);
    },
  });
};