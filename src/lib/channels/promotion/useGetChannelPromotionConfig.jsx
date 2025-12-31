import { useQuery } from "@tanstack/react-query";
import { getChannelPromotionConfig } from "@/api/channels/promotion/getChannelPromotionConfig";

export const useGetChannelPromotionConfig = (channelId) => {
    const { data: promotionConfig, isLoading: promotionLoading } = useQuery({
        queryKey: ["promotion-config", channelId],
        queryFn: () => getChannelPromotionConfig(channelId),
        enabled: !!channelId,
    });

    return { promotionConfig, promotionLoading };
};
