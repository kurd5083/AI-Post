import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePromotionConfigByChannel } from "@/api/channels/promotion/updatePromotionConfigByChannel";

export const useUpdatePromotionConfig = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({channelId, payload}) => updatePromotionConfigByChannel(channelId, payload),
        onSuccess: (_, { channelId }) => { queryClient.invalidateQueries(["promotion-config", channelId])},
    });
};
