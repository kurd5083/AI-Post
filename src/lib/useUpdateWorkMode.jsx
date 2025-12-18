import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkMode } from "@/api/channels/updateWorkMode";

export const useUpdateWorkMode = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workMode }) => updateWorkMode({ channelId, workMode }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};