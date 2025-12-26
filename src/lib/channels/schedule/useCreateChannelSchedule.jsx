import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "@/api/channels/schedule/createSchedule";

export const useCreateChannelSchedule = (channelId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postDays, publicationTimes, timezone }) => createSchedule({ channelId, postDays, publicationTimes, timezone }),
        onSuccess: (data) => {
            console.log("Результат мутации:", data);
            queryClient.invalidateQueries(["channel", channelId]);
        },
    });
};

