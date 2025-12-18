import { useQuery } from "@tanstack/react-query";
import { getAutoApprovalStatus } from "@/api/channels/getAutoApprovalStatus";

export const useAutoApprovalStatus = (channelId) => {
  const { data: autoApprovalStatus } = useQuery({
    queryKey: ["autoApprovalStatus", channelId],
    queryFn: getAutoApprovalStatus(channelId),
    enabled: !!channelId
  });

  return { autoApprovalStatus };
};
