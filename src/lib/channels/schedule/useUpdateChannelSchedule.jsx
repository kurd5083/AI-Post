import { useMutation } from "@tanstack/react-query";
import { updateChannelSchedule } from "@/api/channels/schedule/updateSchedule";

export const useUpdateChannelSchedule = (scheduleId, channelId) => {

  return useMutation({
    mutationFn: ({ postDays, publicationTimes, timezone }) =>
      updateChannelSchedule(scheduleId, { channelId, postDays, publicationTimes, timezone }),
  });
};
