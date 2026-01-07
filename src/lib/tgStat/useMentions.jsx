import { useQuery } from "@tanstack/react-query";
import { getMentions } from "@/api/tgStat/getMentions";

export const useMentions = ({ channelId, limit }) => {
  const { data: mentions, isLoading: mentionsLoading } = useQuery({
    queryKey: ["mentions", channelId, limit],
    queryFn: () => getMentions(channelId, limit),
    enabled: !!channelId,
  });

  return { mentions, mentionsLoading };
};
