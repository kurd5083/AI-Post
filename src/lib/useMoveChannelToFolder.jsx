import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveChannelToFolder } from "@/api/moveChannelToFolder";

export const useMoveChannelToFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveChannelToFolder,

    onSuccess: (data) => {
      console.log("Канал успешно перемещён:", data);
      queryClient.invalidateQueries({ queryKey: ["channelFolders"] });
      queryClient.invalidateQueries({ queryKey: ["channelsGroupedByFolders"] });
    },

    onError: (error) => {
      console.error(
        "Ошибка перемещения канала:",
        error instanceof Error ? error.message : error
      );
    },
  });
};
