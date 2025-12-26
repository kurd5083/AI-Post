import { useQuery } from "@tanstack/react-query";
import { getAllSources } from "@/api/channels/sources/getAllSources";

export const useAllSources = () => {
  const { data: sources, isLoading } = useQuery({
    queryKey: ["all-sources"],
    queryFn: getAllSources,
  });

  return { sources, isLoading};
};