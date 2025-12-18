import { useQuery } from "@tanstack/react-query";
import { getChannelFolders } from "@/api/getChannelFolders";
import { useUser } from "@/lib/useUser";

export const useChannelFolders = () => {
  const { user } = useUser();
  
  const { data } = useQuery({
    queryKey: ["channelFolders", user?.telegramId],
    queryFn: () => getChannelFolders(user.telegramId),
    enabled: !!user?.telegramId,
  });

  return { folders: data?.folders || [], };
};
