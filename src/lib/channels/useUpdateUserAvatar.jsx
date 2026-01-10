import { useMutation } from "@tanstack/react-query";
import { updateUserAvatar } from "@/api/channels/updateUserAvatar";

export const useUpdateUserAvatar = () => {
  return useMutation({
    mutationFn: ({ id, avatarUrl }) => updateUserAvatar(id, avatarUrl),
  });
};
