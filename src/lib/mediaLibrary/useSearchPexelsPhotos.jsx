import { useQuery } from "@tanstack/react-query";
import { searchPexelsPhotos } from "@/api/mediaLibrary/searchPexelsPhotos";

export const useSearchPexelsPhotos = (params) => {
  const { data: photosData, isLoading: photosLoading } = useQuery({
    queryKey: ["pexelsPhotos", params],
    queryFn: () => searchPexelsPhotos(params),
  });

  return { photosData, photosLoading };
};
