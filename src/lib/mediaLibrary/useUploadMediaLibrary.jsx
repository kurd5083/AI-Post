import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMediaLibrary } from "@/api/mediaLibrary/uploadMedia";

export const useUploadMediaLibrary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files) => uploadMediaLibrary(files),
    onSuccess: () => {
      queryClient.invalidateQueries(["mediaLibrary"]);
    },
  });
};
