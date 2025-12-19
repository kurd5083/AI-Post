import { useQuery } from "@tanstack/react-query";
import { getPromptLibrary } from "@/api/channels/getPromptLibrary";

export const useImagePresets = () => {
  const { data: promptLibrary } = useQuery({
    queryKey: ["prompt-library"],
    queryFn: () => getPromptLibrary(),
  });

  return { promptLibrary };
};
