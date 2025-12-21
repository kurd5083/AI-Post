import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableChannelPromotion } from "@/api/channels/enableChannelPromotion";

export const useEnableChannelPromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => enableChannelPromotion(channelId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelsGroupedByFolders"] });
    },

    onError: (error) => {
      console.error(
        "Ошибка включения продвижения:",
        error?.response?.data || error.message
      );
    },
  });
};
