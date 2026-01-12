import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "@/api/channels/schedule/createSchedule";

export const useCreateChannelSchedule = (channelId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postDays, publicationTimes, timezone }) => createSchedule({ channelId, postDays, publicationTimes, timezone }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["channel-schedule", channelId]);
        },
    });
};

