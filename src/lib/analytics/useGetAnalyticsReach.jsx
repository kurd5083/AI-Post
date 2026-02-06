import { useQuery } from "@tanstack/react-query";
import { getAnalyticsReach } from "@/api/analytics/getAnalyticsReach";

export const useGetAnalyticsReach = ({ channel_id, days, date_from, date_to }) => {
    const { data: analyticsReach, isPending: analyticsReachPending } = useQuery({
        queryKey: ["analyticsReach", channel_id, days, date_from, date_to],
        queryFn: () => getAnalyticsReach({ channel_id, days, date_from, date_to }),
        enabled: !!channel_id,
    });

    return { analyticsReach, analyticsReachPending };
};
