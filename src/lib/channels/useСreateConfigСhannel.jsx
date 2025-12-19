import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConfigСhannel } from "@/api/channels/createConfigСhannel";

export const useСreateConfigСhannel = (channelId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createConfigСhannel(channelId, data),
    onSuccess: (data) => {
      console.log("Конфиг создан:", data);
      queryClient.invalidateQueries(["сonfig-сhannel"]);
    },
    onError: (error) => {
      console.error("Ошибка создания конфига:", error.response?.data || error.message);
    },
  });
};