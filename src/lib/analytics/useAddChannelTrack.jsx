import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChannelTrack } from "@/api/analytics/addChannelTrack";

export const useAddChannelTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channel }) => addChannelTrack(channel),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-channels"]);
    },
  });
};
