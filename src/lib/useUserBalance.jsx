import { useQuery } from '@tanstack/react-query';

export const useUserBalance = () => {
    const { data: balance } = useQuery({
        queryKey: ["userBalance"],
        queryFn: fetchUserBalance,
        enabled: !!localStorage.getItem('accessToken'),
    });
    return { balance };
};