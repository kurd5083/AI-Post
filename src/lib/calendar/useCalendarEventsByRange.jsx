import { useQuery } from "@tanstack/react-query";
import { getCalendarEventsByRange } from "@/api/calendar/getCalendarEventsByRange";

export const useCalendarEventsByRange = ({ channelId, startDate, endDate }) => {
    const { data: events } = useQuery({
        queryKey: ["calendar-events", channelId],
        queryFn: () => getCalendarEventsByRange({ channelId, startDate, endDate }),
        enabled: !!channelId,
    });

    return { events };
};
