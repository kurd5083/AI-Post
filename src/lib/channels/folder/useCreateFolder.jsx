import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/api/channels/folder/createFolder";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData) => createFolder(folderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channels-grouped-by-folders"]);
    },
  });
};
