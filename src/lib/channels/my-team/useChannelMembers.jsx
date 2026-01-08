import { useQuery } from "@tanstack/react-query";
import { getChannelMembers } from "@/api/channels/my-team/getChannelMembers";

export const useChannelMembers = (channelId) => {
  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ["channel-members", channelId],
    queryFn: () => getChannelMembers(channelId),
    enabled: !!channelId,
  });

  return { members, membersLoading };
};
