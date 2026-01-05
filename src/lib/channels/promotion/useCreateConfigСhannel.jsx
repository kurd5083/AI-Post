import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConfigСhannel } from "@/api/channels/promotion/createConfigСhannel";

export const useCreateConfigСhannel = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createConfigСhannel(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["config-channel"]);
    },
  });
};
