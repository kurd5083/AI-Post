import { useQuery } from "@tanstack/react-query";
import { getPostTemplateCategories } from "@/api/template/getPostTemplateCategories";

export const useGetPostTemplateCategories = () => {
  const { data: categories, isPending: categoriesPending } = useQuery({
    queryKey: ["post-template-categories"],
    queryFn: getPostTemplateCategories,
  });

  return { categories, categoriesPending  };
};