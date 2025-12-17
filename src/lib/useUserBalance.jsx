import { useQuery } from '@tanstack/react-query';
import { getUserBalance } from '@/api/getUserBalance';

export const useUserBalance = () => {
    const { data: balance } = useQuery({
        queryKey: ["userBalance"],
        queryFn: getUserBalance,
        enabled: !!localStorage.getItem('accessToken'),
    });
    return { balance };
};