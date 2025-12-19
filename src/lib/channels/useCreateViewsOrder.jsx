import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createViewsOrder } from "@/api/channels/createViewsOrder";

export const useCreateViewsOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createViewsOrder(data),
    onSuccess: (data) => {
      console.log("Заказ успешно создан:", data);
      queryClient.invalidateQueries(["views-orders"]);
    },
    onError: (error) => {
      console.error("Ошибка создания заказа:", error.response?.data || error.message);
    },
  });
};