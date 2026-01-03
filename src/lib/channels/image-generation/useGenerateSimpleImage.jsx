import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateSimpleImage } from "@/lib/image-generation/imageGenerationApi";

export const useGenerateSimpleImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ prompt }) => generateSimpleImage(prompt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["generated-images"] });
    },
  });
};
