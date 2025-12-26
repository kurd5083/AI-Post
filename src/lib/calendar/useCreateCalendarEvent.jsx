import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCalendarEvent } from '@/api/calendar/createCalendarEvent';

export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createCalendarEvent(data),

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['calendar-events']});
    },
  });
};