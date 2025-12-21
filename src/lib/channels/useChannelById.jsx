import { useQuery } from "@tanstack/react-query";
import { getChannelById } from "@/api/channels/getChannelById";

export const useChannelById = (channelId) => {
  return useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => getChannelById(channelId),
    enabled: !!channelId,
  });
};
