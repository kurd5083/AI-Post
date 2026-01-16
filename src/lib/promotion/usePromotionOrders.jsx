import { useQuery } from "@tanstack/react-query";
import { getPromotionOrders } from "@/api/promotion/getPromotionOrders";

export const usePromotionOrders = () => {
  const { data: promotionOrders, isPending: promotionOrdersPending } = useQuery({
    queryKey: ["promotion-orders"],
    queryFn: getPromotionOrders,
  });

  return { promotionOrders, promotionOrdersPending };
};