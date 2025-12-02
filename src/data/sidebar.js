import dashboard from "@/assets/sidebar/dashboard.svg";
import ai_generator from "@/assets/sidebar/ai-generator.svg";
import analytics from "@/assets/sidebar/analytics.svg";
import calendar from "@/assets/sidebar/calendar.svg";
import account from "@/assets/sidebar/account.svg";
import promotion from "@/assets/sidebar/promotion.svg";
import media from "@/assets/sidebar/media.svg";
import help from "@/assets/sidebar/help.svg";

export const menuItems = [
    {
        title: "ГЛАВНОЕ",
        items: [
            { id: 1, icon: dashboard, text: "Дашборд", to: "/" },
            { id: 2, icon: ai_generator, text: "AI Генератор", to: "/" },
            { id: 3, icon: analytics, text: "Аналитика", to: "/" }
        ]
    },
    {
        title: "ДОП.",
        items: [
            { id: 4, icon: calendar, text: "Календарь", to: "/" },
            { id: 5, icon: account, text: "Аккаунт", to: "/" },
            { id: 6, icon: promotion, text: "Продвижение", to: "/" },
            { id: 7, icon: media, text: "Медиа", to: "/" }
        ]
    },
    {
        items: [
            { id: 8, icon: help, text: "Помощь", to: "/" }
        ]
    }
];