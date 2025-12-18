import { useQuery } from '@tanstack/react-query';
import { getChannelsUser } from '@/api/getChannelsUser';

export const useChannelsUser = () => {
    const { data: channels } = useQuery({
        queryKey: ["channelsUser"],
        queryFn: getChannelsUser,
        enabled: !!localStorage.getItem('accessToken'),
    });
    return { channels };
};