
import { useQuery } from "@tanstack/react-query";
import { getTrackedChannels } from "@/api/analytics/getTrackedChannels";

export const useGetTrackedChannels = () => {
    const { data: trackedChannels, isPending: trackedChannelsPending } = useQuery({
        queryKey: ["tracked-channels"],
        queryFn: () => getTrackedChannels(),
    });

    return { trackedChannels, trackedChannelsPending };
};
