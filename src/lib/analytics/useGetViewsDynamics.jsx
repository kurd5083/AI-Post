import { useQuery } from "@tanstack/react-query";
import { getViewsDynamics } from "@/api/analytics/getViewsDynamics";

export const useGetViewsDynamics= ({ post_id }) => {
    const { data: getViews, isPending: getViewsPending } = useQuery({
        queryKey: ["get-views-dynamics", post_id],
        queryFn: () => getViewsDynamics({ post_id }),
        enabled: !!post_id,
    });

    return { getViews, getViewsPending };
};
