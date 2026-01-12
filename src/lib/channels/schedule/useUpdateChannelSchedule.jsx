import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelSchedule } from "@/api/channels/schedule/updateSchedule";

export const useUpdateChannelSchedule = (scheduleId, channelId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postDays, publicationTimes, timezone }) =>
      updateChannelSchedule(scheduleId, { channelId, postDays, publicationTimes, timezone }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channel-schedule", channelId]);
    },
  });
};
