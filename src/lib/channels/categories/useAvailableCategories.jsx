import { useQuery } from "@tanstack/react-query";
import { getAvailableCategories } from "@/api/channels/categories/getAvailableCategories";

export const useAvailableCategories = () => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["available-categories"],
    queryFn: getAvailableCategories,
  });

  return { categories, categoriesLoading };
};
