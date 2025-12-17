import { useQuery } from "@tanstack/react-query";
import { getChannelsGroupedByFolders } from "@/api/getChannelsGroupedByFolders";

export const useChannelsGroupedByFolders = () => {
  const { data: channels } = useQuery({
    queryKey: ["channelsGroupedByFolders"],
    queryFn: getChannelsGroupedByFolders,
    enabled: !!localStorage.getItem("accessToken"), // выполняем только если пользователь авторизован
  });

  return { channels };
};