import { useQuery } from "@tanstack/react-query";
import { getChannelStat } from "@/api/tgStat/getChannelStat";

export const useChannelStat = (channelId) => {
  const { data: channelStat, isLoading: channelStatLoading } = useQuery({
    queryKey: ["channel-stat", channelId],
    queryFn: () => getChannelStat(channelId),
    enabled: !!channelId,
  });

  return { channelStat, channelStatLoading };
};
