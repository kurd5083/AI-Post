import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvite } from "@/api/channels/my-team/acceptInvite";

export const useAcceptInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code) => acceptInvite(code),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel-members"]);
    },
  }); 
};