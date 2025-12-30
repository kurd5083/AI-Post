import { useQuery } from "@tanstack/react-query";
import { getChannelStat } from "@/api/tgStat/getChannelStat";

export const useChannelStat = ({channelIds}) => {
  console.log(channelIds, '1111111111111111')
  const { data: channelStat, isLoading: channelStatLoading } = useQuery({
    queryKey: ["channel-stat", channelIds],
    queryFn: () => getChannelStat(channelIds),
    enabled: channelIds && channelIds.length > 0,
  });

  return { channelStat, channelStatLoading };
};