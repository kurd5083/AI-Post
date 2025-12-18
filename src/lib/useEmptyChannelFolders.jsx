import { useQuery } from "@tanstack/react-query";
import { getEmptyChannelFolders } from "@/api/getEmptyChannelFolders";
import { useUser } from "@/lib/useUser";

export const useEmptyChannelFolders = () => {
  const { user } = useUser();
  const telegramId = user?.telegramId;

  const {
    data: folders,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["channelFolders", telegramId],
    queryFn: () => getEmptyChannelFolders(telegramId),
    enabled: !!telegramId, 
  });

  return { folders, isLoading, isError };
};
