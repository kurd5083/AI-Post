import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannelMemberRole } from "@/api/channels/my-team/updateChannelMemberRole";

export const useUpdateChannelMemberRole = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ channelId, memberTelegramId, role }) => updateChannelMemberRole(channelId, memberTelegramId, role),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["channel-members"] });
        },
    });
};