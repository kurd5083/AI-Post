import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelInterval } from "@/api/channels/updateChannelInterval";

export const useUpdateChannelInterval = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ intervalMinutes, isEnabled, avoidNight, activeStartHour, activeEndHour }) =>
      updateChannelInterval(channelId, { intervalMinutes, isEnabled, avoidNight, activeStartHour, activeEndHour }),
    onSuccess: (data) => {
      console.log("Настройки интервала успешно сохранены:", data);
      queryClient.invalidateQueries(["channelInterval", channelId]);
    },
  });
};
