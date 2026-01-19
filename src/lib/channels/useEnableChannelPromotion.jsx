import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableChannelPromotion, disenableChannelPromotion } from "@/api/channels/updateChannelPromotion";

export const useEnableChannelPromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => enableChannelPromotion(channelId),

    onSuccess: () => {
      queryClient.invalidateQueries(["channel"]);
    },
  });
};
export const useDisnableChannelPromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => disenableChannelPromotion(channelId),

    onSuccess: () => {
      queryClient.invalidateQueries(["channel"]);
    },
  });
};
