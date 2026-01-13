import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMediaMetadata } from "@/api/mediaLibrary/updateMediaMetadata";

export const useUpdateMediaMetadata = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateMediaMetadata(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["mediaLibrary"]);
        },
    });
};