import { useQuery } from "@tanstack/react-query";
import { getChannelsGroupedByFolders } from "@/api/getChannelsGroupedByFolders";

export const useChannelsGroupedByFolders = () => {
  // const accessToken = localStorage.getItem("accessToken");

  const { data: channels, isLoading, isError } = useQuery({
    queryKey: ["channelsGroupedByFolders"],
    queryFn: getChannelsGroupedByFolders,
    // enabled: !!accessToken,
  });

  return { channels: channels };
};
