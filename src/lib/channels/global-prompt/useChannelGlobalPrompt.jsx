import { useQuery } from "@tanstack/react-query";
import { getChannelGlobalPrompt } from "@/api/channels/global-prompt/useGetChannelCaption";

export const useChannelGlobalPrompt = (channelId) => {
    const { data: globalPrompt, isPending: promptPending } = useQuery({
        queryKey: ["channel-global-prompt", channelId],
        queryFn: () => getChannelGlobalPrompt(channelId),
        enabled: !!channelId,
    });

    return { globalPrompt, promptPending };
};
