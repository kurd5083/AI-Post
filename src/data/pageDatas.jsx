import AnalyticsIcon from "@/icons/AnalyticsIcon";
import TemplatesIcon from "@/icons/TemplatesIcon";
import CalendarIcon from "@/icons/CalendarIcon";
import AccountIcon from "@/icons/AccountIcon";
import PromotionIcon from "@/icons/PromotionIcon";
import MediaIcon from "@/icons/MediaIcon";
import HelpIcon from "@/icons/HelpIcon";

export const pageDatas = [
  {
    path: "/analytics",
    title: "Аналитика",
    text: "Просматривайте статистику канала за все время",
    icon: <AnalyticsIcon color="#336CFF" width={24} height={24} />,
  },
  {
    path: "/templates",
    title: "Шаблоны",
    text: "Готовые шаблоны для быстрого создания контента",
    icon: <TemplatesIcon color="#336CFF" width={24} height={24} />,
  },
  {
    path: "/calendar",
    title: "Календарь",
    text: "Планируйте и управляйте своими постами в социальных сетях",
    icon: <CalendarIcon color="#336CFF" width={24} height={24} />,
  },
  {
    path: "/account",
    title: "",
    text: "",
    icon: <AccountIcon color="#336CFF" width={24} height={24} />
  },
  {
    path: "/promotion",
    title: "Продвижение",
    text: "Управление услугами продвижения и подписками",
    icon: <PromotionIcon color="#336CFF" width={24} height={24} />,
  },
  {
    path: "/my-orders",
    title: "Мои заказы",
    text: "Управление текущими заказами продвижения",
    icon: <PromotionIcon color="#336CFF" width={24} height={24} />,
  },
  {
    path: "/media",
    title: "Медиатека",
    text: "Управляйте своими изображениями, видео и сгенерированным контентом",
    icon: <MediaIcon color="#336CFF" width={24} height={24} />,
  },
  {
    path: "/help",
    title: "Нужна помощь?",
    text: "Если у вас возникли вопросы - задавайте их нам по почте",
    icon: <HelpIcon color="#336CFF" width={24} height={24} />,
  },
];
