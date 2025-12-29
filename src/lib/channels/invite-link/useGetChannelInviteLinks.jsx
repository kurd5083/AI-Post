import { useQuery } from "@tanstack/react-query";
import { getChannelInviteLinks } from "@/api/channels/invite-link/getChannelInviteLinks";

export const useGetChannelInviteLinks = (channelId) => {
    const { data: links, isLoading: linksLoading } = useQuery({
        queryKey: ["channel-invite-links", channelId],
        queryFn: () => getChannelInviteLinks(channelId),
        enabled: !!channelId,
    });

    return { links, linksLoading };
};
