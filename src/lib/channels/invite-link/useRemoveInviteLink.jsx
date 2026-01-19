import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeInviteLink } from "@/api/channels/invite-link/removeInviteLink";
import { useNotificationStore } from "@/store/notificationStore";

export const useRemoveInviteLink = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: removeInviteLink,
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-invite-links"]);
      addNotification("Ссылка успешно удалена", "delete");
    },
    onError: () => {
      addNotification("Ошибка при удалении ссылки", "error");
    }
  });
};
