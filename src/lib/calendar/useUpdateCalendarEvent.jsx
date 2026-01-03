import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCalendarEvent } from "@/api/calendar/updateCalendarEvent";

export const useUpdateCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCalendarEvent(id, payload),
    onSuccess: () => queryClient.invalidateQueries(["calendar-events"])
  });
};
