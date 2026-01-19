import { useQuery } from '@tanstack/react-query';
import { getUserBalance } from '@/api/user/getUserBalance';

export const useUserBalance = () => {
    const { data: balance } = useQuery({
        queryKey: ["userBalance"],
        queryFn: getUserBalance,
        enabled: !!localStorage.getItem('accessToken'),
    });
    return { balance };
};