import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAutoApprovalStatus } from "@/api/channels/getAutoApprovalStatus";

export const useAutoApprovalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId, bul) => updateAutoApprovalStatus(channelId),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["channel", channelId], updatedData);
    },
  });
};