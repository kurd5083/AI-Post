import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostTemplate } from "@/api/template/deletePostTemplate";

export const useDeletePostTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePostTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["post-templates"]);
    }
  });
};