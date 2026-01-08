import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeChannelMember } from "@/api/channels/my-team/removeMember";
import { useNotificationStore } from "@/store/notificationStore";

export const useRemoveChannelMember = () => {
    const queryClient = useQueryClient();
    const { addNotification } = useNotificationStore();
    return useMutation({
        mutationFn: ({ channelId, memberTelegramId }) => removeChannelMember(channelId, memberTelegramId),
        onSuccess: (data) => {
            addNotification(data.message || "Участник удалён", "delete");
            queryClient.invalidateQueries({ queryKey: ["channel-members"] });
        },

        onError: (err) => {
            addNotification(
                err.response?.data?.message || "Не удалось удалить участника",
                "error"
            );
        },
    });
};
