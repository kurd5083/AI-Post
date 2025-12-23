import { useQuery } from "@tanstack/react-query";
import { getUserChannels } from "@/api/getUserChannels";

export const useUserChannels = () => {
    const { data: userChannels } = useQuery({
        queryKey: ["user-channels"],
        queryFn: getUserChannels,
    });

    return { userChannels };
};
