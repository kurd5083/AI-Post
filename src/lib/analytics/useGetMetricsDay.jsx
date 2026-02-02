import { useQuery } from "@tanstack/react-query";
import { getMetricsDay } from "@/api/analytics/getMetricsDay";

export const useGetMetricsDay = (channel_id) => {
    const { data: metricsDay, isPending: metricsDayPending } = useQuery({
        queryKey: ["metricsDay", channel_id],
        queryFn: () => getMetricsDay(channel_id),
        enabled: !!channel_id,
    });

    return { metricsDay, metricsDayPending };
};
