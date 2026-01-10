import { useQuery } from "@tanstack/react-query";
import { getPromotionOrders } from "@/api/channels/promotion/getPromotionOrders";

export const usePromotionOrders = (filters) => {
  const { data: myOrders, isPending: myOrdersPending, refetch } = useQuery({
    queryKey: ["promotion-orders", filters],
    queryFn: () => getPromotionOrders(filters),
  });

  return { myOrders, myOrdersPending, refetch };
};
