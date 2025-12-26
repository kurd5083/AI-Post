import { useQuery } from "@tanstack/react-query";
import { getPromotionServices } from "@/api/promotion/getPromotionServices";

export const usePromotionServices = () => {
  const { data: servicesData } = useQuery({
    queryKey: ["promotionServices"],
    queryFn: getPromotionServices,
    enabled: !!localStorage.getItem("accessToken"), 
  });

  return { servicesData };
};