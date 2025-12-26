import { useQuery } from "@tanstack/react-query";
import { getChannelMembers } from "@/api/channels/my-team/getChannelMembers";

export const useChannelMembers = (channelName) => {
  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ["channel-members", channelName],
    queryFn: () => getChannelMembers(channelName),
    enabled: !!channelName,
  });

  return { members, membersLoading };
};
