import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChannelInviteLink } from "@/api/channels/invite-link/createChannelInviteLink";

export const useCreateChannelInviteLink = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createChannelInviteLink(channelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-invite-links"]);
    },
  });
};
