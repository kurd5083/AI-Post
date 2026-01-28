import { useQuery } from "@tanstack/react-query";
import { getTelescopeInfo } from "@/api/channels/getTelescopeInfo";

export const useGetTelescopeInfo = (channel_id) => {
    const { data: channelInfo } = useQuery({
        queryKey: ["channels-info", channel_id],
        queryFn: () => getTelescopeInfo({ channel_id }),
        enabled: !!channel_id,
    });

    return { channelInfo };
};