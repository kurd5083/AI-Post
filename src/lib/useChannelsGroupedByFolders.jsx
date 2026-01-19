import { useQuery } from "@tanstack/react-query";
import { getChannelsGroupedByFolders } from "@/api/getChannelsGroupedByFolders";

export const useChannelsGroupedByFolders = () => {
  const { data: channels, isPending: channelsPending } = useQuery({
    queryKey: ["channels-grouped-by-folders"],
    queryFn: getChannelsGroupedByFolders,
    enabled: !!localStorage.getItem('accessToken'),
  });

  return { channels, channelsPending };
};

