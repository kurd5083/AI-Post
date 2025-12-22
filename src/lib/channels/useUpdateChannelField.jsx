import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelField } from "@/api/channels/updateChannelField";

export const useUpdateChannelField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, field }) => updateChannelField(channelId, field),

    onSuccess: (_, { channelId }) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};
