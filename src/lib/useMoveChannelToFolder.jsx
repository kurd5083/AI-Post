import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveChannelToFolder } from "@/api/moveChannelToFolder";
import { usePopupStore } from "../store/popupStore";
export const useMoveChannelToFolder = () => {
  const queryClient = useQueryClient();
  const { closePopup } = usePopupStore();

  return useMutation({
    mutationFn: moveChannelToFolder,

    onSuccess: (data) => {
      console.log("Канал успешно перемещён:", data);
      queryClient.invalidateQueries({ queryKey: ["channelFolders"] });
      queryClient.invalidateQueries({ queryKey: ["channelsGroupedByFolders"] });
      closePopup();
    },

    onError: (error) => {
      console.error(
        "Ошибка перемещения канала:",
        error instanceof Error ? error.message : error
      );
    },
  });
};
