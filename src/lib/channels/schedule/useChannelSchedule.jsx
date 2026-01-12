import { useQuery } from "@tanstack/react-query";
import { getChannelSchedule } from "@/api/channels/getChannelSchedule";

export const useChannelSchedule = (channelId) => {
    const { data: channelSchedule } = useQuery({
        queryKey: ["channel-schedule"],
        queryFn: () => getChannelSchedule(channelId),
        enabled: !!channelId,
    });

    return { channelSchedule };
};
