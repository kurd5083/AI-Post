import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateSimpleImage } from "@/api/channels/image-generation/generateSimpleImage";

export const useGenerateSimpleImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ prompt }) => generateSimpleImage(prompt),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["generated-images"] });
    },
  });
};
