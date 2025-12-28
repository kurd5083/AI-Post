import { useQuery } from "@tanstack/react-query";
import { getGetPostTemplates } from "@/api/template/getGetPostTemplates";

export const useGetPostTemplates = ({category}) => {
  const { data: templates, isLoading: templatesLoading } = useQuery({
    queryKey: ["postTemplates"],
    queryFn: () => getGetPostTemplates(category),
  });

  return { templates, templatesLoading };
};
