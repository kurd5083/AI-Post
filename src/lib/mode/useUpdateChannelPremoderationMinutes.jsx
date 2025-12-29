import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelPremoderationMinutes } from "@/api/channels/mode/updateChannelPremoderationMinutes";

export const useUpdateChannelPremoderationMinutes = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ minutes }) => updateChannelPremoderationMinutes(channelId, minutes),
    onSuccess: (channelId) => { queryClient.invalidateQueries([ "channelPremoderationMinutes", channelId ])},
  });
};
