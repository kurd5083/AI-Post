import { useQuery } from "@tanstack/react-query";
import { getPostsByPeriod } from "@/api/analytics/getPostsByPeriod";

export const useGetPostsByPeriod = ({ channel_id, filter, date_from, date_to }) => {
    const { data: postsByPeriod, isPending: postsByPeriodPending } = useQuery({
        queryKey: ["postsByPeriod", channel_id, filter, date_from, date_to],
        queryFn: () => getPostsByPeriod({ channel_id, date_from, date_to }),
        enabled: !!channel_id,
    });

    return { postsByPeriod, postsByPeriodPending };
};
