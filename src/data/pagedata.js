import analytics from "@/assets/sidebar/analytics-active.svg";
import templates from "@/assets/sidebar/templates-active.svg";
import calendar from "@/assets/sidebar/calendar-active.svg";
import promotion from "@/assets/sidebar/promotion-active.svg";
import media from "@/assets/sidebar/media-active.svg";

export const pagedata = [
    {
        path: "/analytics",
        title: "Аналитика",
        text: "Просматривайте статистику канала за все время",
        image: analytics,
    },
    {
        path: "/templates",
        title: "Шаблоны",
        text: "Готовые шаблоны для быстрого создания контента",
        image: templates,
    },
    {
        path: "/calendar",
        title: "Календарь",
        text: "Планируйте и управляйте своими постами в социальных сетях",
        image: calendar,
    },
    {
        path: "/account",
        title: "",
        text: "",
        image: '',
    },
    {
        path: "/promotion",
        title: "Продвижение",
        text: "Управление услугами продвижения и подписками",
        image: promotion,
    },
    {
        path: "/my-orders",
        title: "Мои заказы",
        text: "Управление текущими заказами продвижения",
        image: promotion,
    },
    {
        path: "/media",
        title: "Медиатека",
        text: "Управляйте своими изображениями, видео и сгенерированным контентом",
        image: media,
    },
    {
        path: "/help",
        title: "",
        text: "",
        image: '',
    },
]