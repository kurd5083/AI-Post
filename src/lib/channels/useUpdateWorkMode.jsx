import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkMode } from "@/api/channels/updateWorkMode";

export const useUpdateWorkMode = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workMode, premoderationMinutes }) =>updateWorkMode({ channelId, workMode, premoderationMinutes }),
    onSuccess: (data) => {
      console.log("Результат мутации:", data);
      queryClient.invalidateQueries(["channel", channelId]);
    },
  });
};