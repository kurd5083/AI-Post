import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannelFolder } from "@/api/createChannelFolder";

export const useCreateChannelFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData) => createChannelFolder(folderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channelsGroupedByFolders"]);
      console.log("Папка успешно создана:", data);
    },
    onError: (error) => {
      console.error("Ошибка создания папки:", error.message);
    },
  });
};
