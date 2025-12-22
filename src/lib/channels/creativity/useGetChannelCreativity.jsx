import { useQuery } from "@tanstack/react-query";
import { getChannelCreativity } from "@/api/channels/creativity/getChannelCreativity";

export const useGetChannelCreativity = (channelId) => {
    const { data: creativity } = useQuery({
        queryKey: ["channel-creativity", channelId],
        queryFn: () => getChannelCreativity(channelId),
        enabled: !!channelId,
    });

    return { creativity };
};
