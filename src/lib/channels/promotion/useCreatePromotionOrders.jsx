import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPromotionOrders } from "@/api/channels/promotion/createPromotionOrders";

export const useCreatePromotionOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createPromotionOrders(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["promotion-orders"]);
    },
  });
};
