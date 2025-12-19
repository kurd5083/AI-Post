import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannelInviteLink } from "@/api/channels/createChannelInviteLink";

export const useCreateChannelInviteLink = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createChannelInviteLink(channelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "channel-invite-links",
        channelId,
      ]);
    },
  });
};
