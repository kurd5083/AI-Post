import dashboard from "@/assets/sidebar/dashboard.svg";
import dashboardActive from "@/assets/sidebar/dashboard-active.svg";
import ai_generator from "@/assets/sidebar/ai-generator.svg";
import ai_generator_active from "@/assets/sidebar/ai-generator-active.svg";
import analytics from "@/assets/sidebar/analytics.svg";
import analytics_active from "@/assets/sidebar/analytics-active.svg";
import templates from "@/assets/sidebar/templates.svg";
import templates_active from "@/assets/sidebar/templates-active.svg";
import calendar from "@/assets/sidebar/calendar.svg";
import calendar_active from "@/assets/sidebar/calendar-active.svg";
import account from "@/assets/sidebar/account.svg";
import account_active from "@/assets/sidebar/account-active.svg";
import promotion from "@/assets/sidebar/promotion.svg";
import promotion_active from "@/assets/sidebar/promotion-active.svg";
import media from "@/assets/sidebar/media.svg";
import media_active from "@/assets/sidebar/media-active.svg";
import help from "@/assets/sidebar/help.svg";
import help_active from "@/assets/sidebar/help-active.svg";

export const menuItems = [
    {
        title: "ГЛАВНОЕ",
        items: [
            { 
                id: 1, 
                icon: dashboard, 
                iconActive: dashboardActive,
                text: "Дашборд", 
                to: "/" 
            },
            { 
                id: 2, 
                icon: ai_generator, 
                iconActive: ai_generator_active,
                text: "AI Генератор", 
                to: "/" 
            },
            { 
                id: 3, 
                icon: analytics, 
                iconActive: analytics_active,
                text: "Аналитика", 
                to: "/" 
            },
            { 
                id: 4, 
                icon: templates, 
                iconActive: templates_active,
                text: "Шаблоны", 
                to: "/" 
            }
        ]
    },
    {
        title: "ДОП.",
        items: [
            { 
                id: 5, 
                icon: calendar, 
                iconActive: calendar_active,
                text: "Календарь", 
                to: "/" 
            },
            { 
                id: 6, 
                icon: account, 
                iconActive: account_active,
                text: "Аккаунт", 
                to: "/" 
            },
            { 
                id: 7, 
                icon: promotion, 
                iconActive: promotion_active,
                text: "Продвижение", 
                to: "/" 
            },
            { 
                id: 8, 
                icon: media, 
                iconActive: media_active,
                text: "Медиа", 
                to: "/" 
            }
        ]
    },
    {
        items: [
            { 
                id: 9, 
                icon: help, 
                iconActive: help_active,
                text: "Помощь", 
                to: "/" 
            }
        ]
    }
];