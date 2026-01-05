import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkMode } from "@/api/channels/mode/updateWorkMode";

export const useUpdateWorkMode = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workMode, premoderationMinutes }) =>updateWorkMode({ channelId, workMode, premoderationMinutes }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};