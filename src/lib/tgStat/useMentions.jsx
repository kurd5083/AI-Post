import { useQuery } from "@tanstack/react-query";
import { getMentions } from "@/api/tgStat/getMentions";

export const useMentions = ({ channelId, limit }) => {
  const { data: mentions, isPending: mentionsPending } = useQuery({
    queryKey: ["mentions", channelId, limit],
    queryFn: () => getMentions(channelId, limit),
    enabled: !!channelId,
  });

  return { mentions, mentionsPending };
};
