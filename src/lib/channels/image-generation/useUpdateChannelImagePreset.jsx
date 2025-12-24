import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelImagePreset } from "@/api/channels/image-generation/updateChannelImagePreset";

export const useUpdateChannelImagePreset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, data }) => updateChannelImagePreset(channelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channel-image-preset"] });
    },
  });
};