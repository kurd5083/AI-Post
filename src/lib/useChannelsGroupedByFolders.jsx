import { useQuery } from "@tanstack/react-query";
import { getChannelsGroupedByFolders } from "@/api/getChannelsGroupedByFolders";
import { useUser } from "@/lib/useUser";

export const useChannelsGroupedByFolders = () => {
  const { user } = useUser();
  
  const { data } = useQuery({
    queryKey: ["channelsGroupedByFolders", user?.telegramId],
    queryFn: () => getChannelsGroupedByFolders(user.telegramId),
    enabled: !!user?.telegramId,
  });

  return { folders: data?.folders || [], };
};

