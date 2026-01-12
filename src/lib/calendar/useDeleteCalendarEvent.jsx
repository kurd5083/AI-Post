import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCalendarEvent } from '@/api/calendar/deleteCalendarEvent';
import { useNotificationStore } from '@/store/notificationStore';

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id) => deleteCalendarEvent(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      addNotification('Событие успешно удалено', 'delete');
    },

    onError: (err) => {
      addNotification(err.message || 'Ошибка при удалении события', 'error');
    },
  });
};
