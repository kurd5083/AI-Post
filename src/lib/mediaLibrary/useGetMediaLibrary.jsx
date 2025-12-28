
import { useQuery } from "@tanstack/react-query";
import { getMediaLibrary } from "@/api/mediaLibrary/getMediaLibrary";

export const useGetMediaLibrary = () => {
  const { data: mediaItems, isLoading: mediaLoading } = useQuery({
    queryKey: ["mediaLibrary"],
    queryFn: getMediaLibrary,
    enabled: !!localStorage.getItem("accessToken"),
  });

  return { mediaItems, mediaLoading };
};
