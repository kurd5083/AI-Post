import { useQuery } from "@tanstack/react-query";
import { mentionsDiscover } from "@/api/analytics/mentionsDiscover";

export const useMentionsDiscover= ({ channel_id }) => {
    const { data: mentions, isPending: mentionsPending } = useQuery({
        queryKey: ["mentions", channel_id],
        queryFn: () => mentionsDiscover(channel_id),
        enabled: !!channel_id,
    });

    return { mentions, mentionsPending };
};
