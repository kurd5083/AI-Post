import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/api/deleteFolder";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["channelsGroupedByFolders"]);
      console.log("Папка успешно удалена");
    },
    onError: (error) => {
      console.error("Ошибка при удалении папки:", error);
    },
  });
};
