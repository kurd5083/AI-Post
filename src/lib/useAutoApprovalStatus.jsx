import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAutoApprovalStatus, updateAutoApprovalStatus } from "@/api/getAutoApprovalStatus";

export const useAutoApprovalStatus = (channelId) => {
  const queryClient = useQueryClient();

  const { data: autoApprovalStatus} = useQuery({
    queryKey: ["autoApprovalStatus", channelId],
    queryFn: () => getAutoApprovalStatus(channelId),
    enabled: !!channelId,
  });

  const { mutate: setAutoApprovalStatus} = useMutation({
    mutationFn: updateAutoApprovalStatus,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["autoApprovalStatus", channelId], updatedData);
    },
  });

  return {
    autoApprovalStatus,
    setAutoApprovalStatus,
  };
};