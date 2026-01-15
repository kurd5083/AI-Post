import { useQuery } from "@tanstack/react-query";
import { getCalendarEventsByRange } from "@/api/calendar/getCalendarEventsByRange";

export const useCalendarEventsByRange = (startDate, endDate) => {
  const { data: events, isPending: eventsPending } = useQuery({
    queryKey: ["calendar-events", startDate, endDate],
    queryFn: () => getCalendarEventsByRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return { events, eventsPending };
};

