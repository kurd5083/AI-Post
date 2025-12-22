import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/api/channels/createFolder";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData) => createFolder(folderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channelsGroupedByFolders"]);
      console.log("Папка успешно создана:", data);
    },
    onError: (error) => {
      console.error("Ошибка создания папки:", error.message);
    },
  });
};
