import { useQuery } from "@tanstack/react-query";
import { getAdReachPeriod } from "@/api/analytics/getAdReachPeriod";

export const useGetAdReachPeriod = ({ channel_id, filter, days, date_from, date_to }) => {
    const { data: adReachPeriod, isPending: adReachPending } = useQuery({
        queryKey: ["adReach", channel_id, days, date_from, date_to, filter],
        queryFn: () => getAdReachPeriod({ channel_id, days, date_from, date_to }),
        enabled: !!channel_id,
    });

    return { adReachPeriod, adReachPending };
};
