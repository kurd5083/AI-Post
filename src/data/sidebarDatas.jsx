import DashboardIcon from "@/icons/DashboardIcon";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import AnalyticsIcon from "@/icons/AnalyticsIcon";
import TemplatesIcon from "@/icons/TemplatesIcon";
import CalendarIcon from "@/icons/CalendarIcon";
import AccountIcon from "@/icons/AccountIcon";
import PromotionIcon from "@/icons/PromotionIcon";
import MediaIcon from "@/icons/MediaIcon";
import HelpIcon from "@/icons/HelpIcon";

export const sidebarDatas = [
  {
    title: "Контент",
    items: [
      { 
        id: 1, 
        icon: (isActive) => <DashboardIcon color={isActive ? "#336CFF" : "#6A7080"} />, 
        text: "Дашборд", 
        to: "/" 
      },
      { 
        id: 2, 
        icon: (isActive) => <AiGeneratorIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "AI Генератор", 
        to: "" ,
        popup: 'create_post'
      },
      { 
        id: 3, 
        icon: (isActive) => <CalendarIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "Календарь", 
        to: "/calendar" 
      },
      { 
        id: 4, 
        icon: (isActive) => <MediaIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "Медиа", 
        to: "/media" 
      }
     
      // { 
      //   id: 4, 
      //   icon: (isActive) => <TemplatesIcon color={isActive ? "#336CFF" : "#6A7080"} />,
      //   text: "Шаблоны", 
      //   to: "/templates" 
      // }
    ]
  },
  {
    title: "Инструменты",
    items: [
       { 
        id: 5, 
        icon: (isActive) => <AnalyticsIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "Аналитика", 
        to: "/analytics" 
      },
      
      { 
        id: 6, 
        icon: (isActive) => <PromotionIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "Продвижение", 
        to: "/promotion" 
      },
      
    ]
  },
  {
    title: "Дополнительно",
    items: [
      { 
        id: 7, 
        icon: (isActive) => <AccountIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "Аккаунт", 
        to: "" ,
        popup: 'profile'
      },
      { 
        id: 8, 
        icon: (isActive) => <HelpIcon color={isActive ? "#336CFF" : "#6A7080"} />,
        text: "Помощь", 
        to: "/help" 
      }
    ]
  }
];
