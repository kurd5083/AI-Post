import { useQuery } from "@tanstack/react-query";
import { getTelegramBotInfo } from "@/api/user/getTelegramBotInfo";

export const useTelegramBotInfo = () => {
  const { data: botInfo } = useQuery({
    queryKey: ["telegram-bot-info"],
    queryFn: getTelegramBotInfo,
  });

  return { botInfo };
};
