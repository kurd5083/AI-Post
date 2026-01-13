import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMediaFile } from "@/api/mediaLibrary/deleteFile";

export const useDeleteMediaFile = () => {
  const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteMediaFile(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["mediaLibrary"]);
        },
    });
}