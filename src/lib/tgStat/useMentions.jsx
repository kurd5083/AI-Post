import { useQuery } from "@tanstack/react-query";
import { getMentions } from "@/api/tgStat/getMentions";

export const useMentions = ({channelIds}) => {
    console.log(channelIds)
  const { data: mentions, isLoading: mentionsLoading } = useQuery({
    queryKey: ["mentions", channelIds],
    queryFn: () => getMentions(channelIds),
    enabled: channelIds && channelIds.length > 0,
  });

  return { mentions, mentionsLoading };
};
