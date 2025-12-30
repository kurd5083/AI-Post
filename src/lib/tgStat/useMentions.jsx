import { useQuery } from "@tanstack/react-query";
import { getMentions } from "@/api/tgStat/getMentions";

export const useMentions = (channelIds) => {
  const { data: mentions, isLoading: mentionsLoading } = useQuery({
    queryKey: ["mentions", channelIds],
    queryFn: () => getMentions(channelIds),
    enabled: Array.isArray(channelIds) && channelIds.length > 0,
  });

  return { mentions, mentionsLoading };
};
