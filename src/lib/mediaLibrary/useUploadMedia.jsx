import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMedia } from "@/api/mediaLibrary/uploadMedia";

export const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({files, url}) => uploadMedia({files, url}),
    onSuccess: () => {
      queryClient.invalidateQueries(["mediaLibrary"]);
    },
  });
};
