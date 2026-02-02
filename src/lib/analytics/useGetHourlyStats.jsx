import { useQuery } from "@tanstack/react-query";
import { getHourlyStats } from "@/api/analytics/getHourlyStats";

export const useGetHourlyStats = (channel_id) => {
    const { data: hourlyStats, isPending: hourlyStatsPending } = useQuery({
        queryKey: ["hourlyStats", channel_id],
        queryFn: () => getHourlyStats(channel_id),
        enabled: !!channel_id,
    });

    return { hourlyStats, hourlyStatsPending };
};
