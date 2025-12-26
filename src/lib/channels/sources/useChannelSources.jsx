import { useQuery } from "@tanstack/react-query";
import { getChannelSources } from "@/api/channels/sources/getChannelSources";

export const useChannelSources = (channelId) => {
  const { data: sources } = useQuery({
    queryKey: ["channel-sources", channelId],
    queryFn: () => getChannelSources(channelId),
    enabled: !!channelId,
  });

  return { sources };
};
