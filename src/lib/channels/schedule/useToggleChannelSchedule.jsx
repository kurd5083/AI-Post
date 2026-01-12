import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChannelSchedule } from "@/api/channels/schedule/toggleChannelSchedule";

export const useToggleChannelSchedule = (channelId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => toggleChannelSchedule(channelId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channel-schedule-status", channelId]);
    },
  });
};