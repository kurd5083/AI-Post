import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelImagePreset } from "@/api/channels/image-generation/updateChannelImagePreset";

export const useUpdateChannelImagePreset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, presetId }) => updateChannelImagePreset(channelId, presetId),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-image-preset"]);
    },
  });
};