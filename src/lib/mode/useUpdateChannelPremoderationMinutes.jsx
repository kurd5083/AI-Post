import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelPremoderationMinutes } from "@/api/channels/mode/updateChannelPremoderationMinutes";

export const useUpdateChannelPremoderationMinutes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => updateChannelPremoderationMinutes(channelId),
    onSuccess: (channelId) => { queryClient.invalidateQueries([ "channelPremoderationMinutes", channelId ])},
  });
};
