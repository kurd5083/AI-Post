import { useQuery } from "@tanstack/react-query";
import { getDayTracking } from "@/api/analytics/getDayTracking";

export const useGetDayTracking = (channel_id) => {
    const { data: dayTracking, isPending: dayTrackingPending } = useQuery({
        queryKey: ["dayTracking", channel_id],
        queryFn: () => getDayTracking(channel_id),
        enabled: !!channel_id,
    });

    return { dayTracking, dayTrackingPending };
};
