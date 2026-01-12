import { useQuery } from "@tanstack/react-query";
import { getChannelSchedule } from "@/api/channels/schedule/getChannelSchedule";

export const useChannelSchedule = (channelId) => {
    const { data: channelSchedule } = useQuery({
        queryKey: ["channel-schedule", channelId],
        queryFn: () => getChannelSchedule(channelId),
        enabled: !!channelId,
    });

    return { channelSchedule };
};
