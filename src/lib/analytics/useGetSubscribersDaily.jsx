import { useQuery } from "@tanstack/react-query";
import { getSubscribersDaily } from "@/api/analytics/getSubscribersDaily";

export const useGetSubscribersDaily= ({ channel_id, date, date_from, date_to }) => {
    const { data: subscribersDaily, isPending: subscribersDailyPending } = useQuery({
        queryKey: ["subscribers-daily", channel_id, date, date_from, date_to],
        queryFn: () => getSubscribersDaily({ channel_id, date, date_from, date_to}),
        enabled: !!channel_id,
    });

    return { subscribersDaily, subscribersDailyPending };
};
