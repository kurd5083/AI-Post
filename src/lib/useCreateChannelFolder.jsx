import { useMutation } from "@tanstack/react-query";
import { createChannelFolder } from "@/api/createChannelFolder";

export const useCreateChannelFolder = () => {
  return useMutation({
    mutationFn: createChannelFolder,
    onSuccess: (data) => {
      console.log("Папка успешно создана:", data);
    },
    onError: (error) => {
      console.error("Ошибка создания папки:", error.message);
    },
  });
};
