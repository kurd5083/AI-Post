import { useQuery } from "@tanstack/react-query";
import { getChannelStat } from "@/api/tgStat/getChannelStat";

export const useChannelStat = ({channelIds}) => {
  const { data: channelStat, isLoading: channelStatLoading } = useQuery({
    queryKey: ["channel-stat", channelIds],
    queryFn: () => getChannelStat(channelIds),
    enabled: channelIds.length > 0,
  });

  return { channelStat, channelStatLoading };
};