import { useQuery } from "@tanstack/react-query";
import { getChannelInterval } from "@/api/channels/getChannelInterval";

export const useChannelInterval = (channelId) => {
   const { data: channelInterval } = useQuery({
    queryKey: ["channel-interval", channelId],
    queryFn: () => getChannelInterval(channelId),
    enabled: !!channelId,
  });

  return { channelInterval };
};
