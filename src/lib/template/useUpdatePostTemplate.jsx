import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostTemplate } from '@/api/template/updatePostTemplate';

export const useUpdatePostTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}) => updatePostTemplate(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["post-templates"]);
        }
    });
};
