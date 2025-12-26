import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChannelSource } from "@/api/channels/sources/deleteChannelSource";

export const useDeleteChannelSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({channelId, sourceId}) => deleteChannelSource(channelId, sourceId),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channel-sources", channelId]);
    },
  });
};
