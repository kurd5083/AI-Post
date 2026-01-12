import { useMutation } from "@tanstack/react-query";
import { toggleChannelSchedule } from "@/api/channels/schedule/toggleChannelSchedule";

export const useToggleChannelSchedule = (channelId) => {

  return useMutation({
    mutationFn: () => toggleChannelSchedule(channelId),
  });
};