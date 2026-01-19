import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveChannelToFolder } from "@/api/channels/folder/moveChannelToFolder";
import { usePopupStore } from "@/store/popupStore";

export const useMoveChannelToFolder = () => {
  const queryClient = useQueryClient();
  const { closePopup } = usePopupStore();

  return useMutation({
    mutationFn: moveChannelToFolder,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["channels-grouped-by-folders"]);
      closePopup();
    },

    onError: (error) => {
      console.error(
        error instanceof Error ? error.message : error
      );
    },
  });
};
