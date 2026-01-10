import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMedia } from "@/api/mediaLibrary/uploadMedia";

export const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files) => uploadMedia(files),
    onSuccess: () => {
      queryClient.invalidateQueries(["mediaLibrary"]);
    },
  });
};
