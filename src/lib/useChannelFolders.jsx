import { useQuery } from "@tanstack/react-query";
import { getChannelFolders } from "@/api/getChannelFolders";
import { useUser } from "@/lib/useUser";

export const useChannelFolders = () => {
  const { user } = useUser();
  const telegramId = user?.telegramId;

  const {
    data: folders,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["channelFolders", telegramId],
    queryFn: () => getChannelFolders(telegramId),
    enabled: !!telegramId, 
  });

  return { folders, isLoading, isError };
};
