import { useQuery } from "@tanstack/react-query";
import { getAvgReach } from "@/api/analytics/getAvgReach";

export const useGetAvgReach = ({ channelId, startDate, endDate, group }) => {
    const { data: avgReach, isPending: avgReachPending } = useQuery({
        queryKey: ["avgReach", channelId, startDate, endDate, group],
        queryFn: () => getAvgReach({ channelId, startDate, endDate, group}),
        enabled: !!channelId,
    });

    return { avgReach, avgReachPending };
};
