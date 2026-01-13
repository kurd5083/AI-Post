import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelCreativity } from "@/api/channels/creativity/updateChannelCreativity";

export const useUpdateChannelCreativity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, value }) => updateChannelCreativity(channelId, value),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-creativity"]);
    },
  });
};
