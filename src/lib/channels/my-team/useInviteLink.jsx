import { useQuery } from "@tanstack/react-query";
import { getInviteLink } from "@/api/channels/my-team/getInviteLink";

export const useInviteLink = (channelId) => {
  const { data: inviteData, isLoading: inviteLoading } = useQuery({
    queryKey: ["channel-members-link", channelId],
    queryFn: () => getInviteLink(channelId),
    enabled: !!channelId, 
  });

  return { inviteData, inviteLoading };
};