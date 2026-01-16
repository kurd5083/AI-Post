import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPromotionOrder } from "@/api/promotion/createPromotionOrder";

export const useCreatePromotionOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }) => createPromotionOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["promotion-orders"]);
    },
  });
};