import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostTemplate } from "@/api/template/createPostTemplate";

export const useCreatePostTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dataToSend) => createPostTemplate(dataToSend),
    onSuccess: () => {
      queryClient.invalidateQueries(["postTemplates"]);
    },
  });
};
