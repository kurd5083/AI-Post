import { useQuery } from "@tanstack/react-query";
import { getChannelScheduleStatus  } from "@/api/channels/schedule/getChannelScheduleStatus";

export const useChannelScheduleStatus = (channelId) => {
    const { data: scheduleStatus } = useQuery({
        queryKey: ["channel-schedule-status", channelId],
        queryFn: () => getChannelScheduleStatus(channelId),
        enabled: !!channelId,
    });

    return { scheduleStatus };
};
