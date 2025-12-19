import { useQuery } from "@tanstack/react-query";
import { getImagePresets } from "@/lib/api/imagePresets";

export const useImagePresets = () => {
  const { data: imagePresets } = useQuery({
    queryKey: ["image-presets"],
    queryFn: () => getImagePresets(),
  });

  return { imagePresets };
};
