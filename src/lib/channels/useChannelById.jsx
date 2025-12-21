import { useQuery } from "@tanstack/react-query";
import { getChannelById } from "@/api/channels/getChannelById";

export const useChannelById = (channelId) => {
    const { data: channel } = useQuery({
        queryKey: ["channel", channelId],
        queryFn: () => getChannelById(channelId),
        enabled: !!channelId,
    });

    return { channel };
};
