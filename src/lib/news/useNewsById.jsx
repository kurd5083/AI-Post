import { useQuery } from "@tanstack/react-query";
import { getNewsById } from "@/api/news/getNewsById";

export const useNewsById = (id) => {
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["newsById", id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });

  return { news, newsLoading };
};
