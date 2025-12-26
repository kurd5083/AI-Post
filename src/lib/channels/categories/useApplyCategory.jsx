import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCategoryToChannel } from "@/api/channels/categories/applyCategory";

export const useApplyCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({channelId, category}) => applyCategoryToChannel(channelId, category),
        onSuccess: (channelId) => {
            queryClient.invalidateQueries(["channel-sources", channelId]);
        },
    });
};