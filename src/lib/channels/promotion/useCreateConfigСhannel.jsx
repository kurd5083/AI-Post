import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConfigСhannel } from "@/api/channels/promotion/createConfigСhannel";

export const useCreateConfigСhannel = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createConfigСhannel(data),
    onSuccess: (data) => {
      console.log("Конфиг создан:", data);
      queryClient.invalidateQueries(["config-channel"]);
    },
    onError: (error) => {
      console.error("Ошибка создания конфига:", error.response?.data || error.message);
    },
  });
};
