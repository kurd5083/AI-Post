import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChannel } from "@/api/channels/deleteChannel";

export const useDeleteChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId) => deleteChannel(channelId),
    onSuccess: (channelId) => {
      queryClient.invalidateQueries(["channelsGroupedByFolders"]);
      console.log(`Канал ${channelId} успешно удалён`);
    },
    onError: (error) => {
      console.error("Ошибка при удалении канала:", error);
    },
  });
};
