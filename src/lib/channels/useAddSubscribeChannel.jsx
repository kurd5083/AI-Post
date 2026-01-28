import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSubscribeChannel } from "@/api/channels/addSubscribeChannel";

export const useAddSubscribeChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({channel}) => addSubscribeChannel({channel}),
    // onSuccess: () => {
    //   queryClient.invalidateQueries([""]);
    // },
  });
};