import { useQuery } from '@tanstack/react-query';
import { getTelegramBotLink } from '@/api/usersAuth';

export const useTelegramBotLink = () => {
  const { data: botLinkData } = useQuery({
    queryKey: ['telegramBotLink'],
    queryFn: getTelegramBotLink,
  });

  return { botLinkData };
};
