import { useQuery } from "@tanstack/react-query";
import { getChannelPromotionConfig } from "@/api/channels/getChannelPromotionConfig";

export const useGetChannelPromotionConfig = (channelId) => {
    const { data: promotionConfig } = useQuery({
        queryKey: ["promotion-config", channelId],
        queryFn: () => getChannelPromotionConfig(channelId),
        enabled: !!channelId,
    });

    return { promotionConfig };
};
