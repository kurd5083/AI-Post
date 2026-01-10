import { useQuery } from "@tanstack/react-query";
import { getChannelRoles } from "@/api/channels/my-team/getChannelRoles";

export const useChannelRoles = () => {
  const { data: channelRoles, isPending: rolesPending } = useQuery({
    queryKey: ["channel-roles"],
    queryFn: () => getChannelRoles(),
  });

  return { channelRoles, rolesPending };
};