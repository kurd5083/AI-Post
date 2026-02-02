import { useQuery } from "@tanstack/react-query";
import { getAdReachPeriod } from "@/api/analytics/getAdReachPeriod";

export const useGetAdReachPeriod = ({ channel_id, date_from, date_to }) => {
    const { data: adReachPeriod, isPending: adReachPending } = useQuery({
        queryKey: ["adReach", channel_id, date_from, date_to],
        queryFn: () => getAdReachPeriod({ channel_id, date_from, date_to }),
        enabled: !!channel_id,
    });

    return { adReachPeriod, adReachPending };
};
