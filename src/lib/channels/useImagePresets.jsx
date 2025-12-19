import { useQuery } from "@tanstack/react-query";
import { getImagePresets } from "@/api/channels/getImagePresets";

export const useImagePresets = () => {
  const { data: imagePresets } = useQuery({
    queryKey: ["image-presets"],
    queryFn: () => getImagePresets(),
  });

  return { imagePresets };
};
