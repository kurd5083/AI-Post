import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoostOrder } from "@/api/channels/createBoostOrder";

export const useCreateBoostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createBoostOrder(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["boost-orders"]);
    },
    onError: (error) => {
      console.error("Ошибка создания заказа на буст:", error.response?.data || error.message);
    },
  });
};
