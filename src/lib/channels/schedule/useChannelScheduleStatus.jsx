import { useQuery } from "@tanstack/react-query";
import { getChannelSchedule } from "@/api/channels/schedule/getChannelSchedule";

export const useChannelScheduleStatus = (channelId) => {
    const { data: scheduleStatus } = useQuery({
        queryKey: ["channel-schedule"],
        queryFn: () => getChannelSchedule(channelId),
        enabled: !!channelId,
    });

    return { scheduleStatus };
};
