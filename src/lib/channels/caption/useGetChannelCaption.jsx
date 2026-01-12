import { useQuery } from "@tanstack/react-query";
import { getChannelCaption } from "@/api/channels/caption/getChannelCaption";

export const useGetChannelCaption = (channelId) => {
    const { data: caption, isPending: captionPending } = useQuery({
        queryKey: ["channel-caption", channelId],
        queryFn: () => getChannelCaption(channelId),
        enabled: !!channelId,
    });

    return { caption, captionPending };
};
