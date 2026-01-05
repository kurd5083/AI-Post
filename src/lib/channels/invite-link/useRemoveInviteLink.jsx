import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeInviteLink } from "@/api/channels/invite-link/removeInviteLink";

export const useRemoveInviteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkId) => removeInviteLink(linkId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["channel-invite-links"] });
    },
  });
};
