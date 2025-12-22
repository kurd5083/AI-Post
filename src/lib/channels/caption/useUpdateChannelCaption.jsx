import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelCaption } from "@/api/channels/caption/updateChannelCaption";

export const useUpdateChannelCaption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, value }) => updateChannelCaption(channelId, value),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-caption", channelId]);
    },
  });
};
