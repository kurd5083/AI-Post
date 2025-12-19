import { useQuery } from "@tanstack/react-query";
import { getChannelPromotionConfig } from "@/api/channels/getChannelPromotionConfig";

export const useGetChannelPromotionConfig = (channelId) => {
  return useQuery({
    queryKey: ["promotion-config", channelId],
    queryFn: () => getChannelPromotionConfig(channelId),
    enabled: !!channelId, 
  });
};
