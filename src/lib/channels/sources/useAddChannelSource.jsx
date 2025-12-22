import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChannelSource } from "@/api/channels/sources/addChannelSource";

export const useAddChannelSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({channelId, url}) => addChannelSource(channelId, url),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel-sources", channelId]);
    },
  });
};
