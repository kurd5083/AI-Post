import { useQuery } from "@tanstack/react-query";
import { getUserChannels } from "@/api/channels/getUserChannels";

export const useUserChannels = () => {
    const { data: userChannels, isPending: userPending } = useQuery({
        queryKey: ["user-channels"],
        queryFn: getUserChannels,
    });

    return { userChannels, userPending };
};
