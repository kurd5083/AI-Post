import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAutoApprovalStatus } from "@/api/channels/getAutoApprovalStatus";

export const useAutoApprovalStatus = (channelId) => {
  const queryClient = useQueryClient();

  const { mutate: setAutoApprovalStatus} = useMutation({
    mutationFn: (channelId) => updateAutoApprovalStatus(channelId, autoApprovalEnabled),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["autoApprovalStatus", channelId], updatedData);
    },
  });

  return {setAutoApprovalStatus};
};