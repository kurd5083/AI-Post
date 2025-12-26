import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelGlobalPrompt } from "@/api/channels/global-prompt/updateChannelGlobalPrompt";

export const useUpdateChannelGlobalPrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, value }) => updateChannelGlobalPrompt(channelId, value),

    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel-global-prompt", channelId]);
    },
  });
};
