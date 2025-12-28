import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostTemplate } from "@/api/template/createPostTemplate";

export const useCreatePostTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateData) => createPostTemplate(templateData),
    onSuccess: (newTemplate) => {
      queryClient.invalidateQueries(["postTemplates"]);
    },
  });
};
