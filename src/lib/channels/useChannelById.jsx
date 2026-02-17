import { useQuery } from "@tanstack/react-query";
import { getChannelById } from "@/api/channels/getChannelById";

export const useChannelById = (channelId, monitored) => {
  const isMonitored = monitored === "true";
  
  const { data: channel, isPending } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => getChannelById(channelId),
    enabled: !isMonitored && !!channelId,
  });

  return { channel, isPending };
};