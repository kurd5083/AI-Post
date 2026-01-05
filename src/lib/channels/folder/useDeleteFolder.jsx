import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/api/channels/folder/deleteFolder";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["channelsGroupedByFolders"]);
    },
  });
};