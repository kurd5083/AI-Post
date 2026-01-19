import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAutoApprovalStatus } from "@/api/channels/updateAutoApprovalStatus";

export const useAutoApprovalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, autoApprovalEnabled }) => updateAutoApprovalStatus(channelId, autoApprovalEnabled ),
    onSuccess: () => {
      queryClient.invalidateQueries(["channel"]);
    },
  });
};