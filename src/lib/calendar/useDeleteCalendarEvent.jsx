import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCalendarEvent } from '@/api/calendar/deleteCalendarEvent';

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteCalendarEvent(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });
};
