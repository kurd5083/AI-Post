import { useQuery } from '@tanstack/react-query';
import { getTelegramBotLink } from '@/api/getTelegramBotLink';

export const useTelegramBotLink = () => {
  const { data: botLinkData } = useQuery({
    queryKey: ['telegramBotLink'],
    queryFn: ()=> getTelegramBotLink(),
  });

  return { botLinkData };
};
