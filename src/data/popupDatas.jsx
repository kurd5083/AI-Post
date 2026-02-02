import SpeakerIcon from "@/icons/SpeakerIcon";
import mode from "@/assets/popup/mode.svg";
import publications from "@/assets/popup/publications.svg";
import promotion from "@/assets/popup/promotion.svg";
import auto_accepting from "@/assets/popup/auto-accepting.svg";
import link_generation from "@/assets/popup/link-generation.svg";
import my_team from "@/assets/popup/my-team.svg";
import image_generation from "@/assets/popup/image-generation.svg";
import filtering from "@/assets/popup/filtering.svg";
import calendar from "@/assets/popup/calendar.svg";
import schedule from "@/assets/popup/schedule.svg";
import sources from "@/assets/popup/sources.svg";
import post_style from "@/assets/popup/post-style.svg";
import advanced from "@/assets/popup/advanced.svg";
import replenish from "@/assets/popup/replenish.svg";
import bell from "@/assets/bell.svg";
import MediaIcon from "@/icons/MediaIcon";
import EyeIcon from "@/icons/EyeIcon";

export const popupDatas = [
    {
        key: "posting",
        name: "Постинг",
        extra: {
            background: "#5D443A",
            image: '',
            icon: <SpeakerIcon color="#FF9C55"/>
        }
    },
    {
        key: "mode",
        name: "Режим",
        extra: {
            background: "#1F326B",
            image: mode
        }
    },
    {
        key: "publications",
        name: "Публикации",
        extra: {
            background: "#382B73",
            image: publications
        }
    },
    {
        key: "promotion",
        name: "Продвижение",
        extra: {
            background: "#552F43",
            image: promotion
        }
    },
    {
        key: "boosts",
        name: "Продвижение",
        extra: {
            background: "#552F43",
            image: promotion
        }
    },
    {
        key: "auto_accepting",
        name: "Автоприём заявок",
        extra: {
            background: "#2E5E5F",
            image: auto_accepting
        }
    },
    {
        key: "link_generation_prev",
        name: "Генерация ссылок",
        extra: {
            background: "#603642",
            image: link_generation
        }
    },
    {
        key: "link_generation",
        name: "Генерация ссылок",
        extra: {
            background: "#603642",
            image: link_generation
        }
    },
    {
        key: "my_link_generation",
        name: "Генерация ссылок",
        extra: {
            background: "#603642",
            image: link_generation
        }
    },
    {
        key: "my_team",
        name: "Моя команда",
        extra: {
            background: "#2F4F6D",
            image: my_team
        }
    },
    {
        key: "my_team_add",
        name: "Моя команда",
        extra: {
            background: "#2F4F6D",
            image: my_team
        }
    },
    {
        key: "image_generation",
        name: "Генерация изображений",
        extra: {
            background: "#375930",
            image: image_generation
        }
    },
    {
        key: "filtering",
        name: "Фильтрация",
        extra: {
            background: "#643358",
            image: filtering
        }
    },
    {
        key: "calendar",
        name: "Календарь",
        extra: {
            background: "#47346C",
            image: calendar
        }
    },
    {
        key: "schedule",
        name: "Расписание",
        extra: {
            background: "#5F6046",
            image: schedule
        }
    },
    {
        key: "sources",
        name: "Источники",
        extra: {
            background: "#203F67",
            image: sources
        }
    },
    {
        key: "compilation",
        name: "Подборка",
        extra: {
            background: "#203F67",
            image: sources
        }
    },
    {
        key: "post_style",
        name: "Стиль промптов",
        extra: {
            background: "#5F3C36",
            image: post_style
        }
    },
    {
        key: "advanced",
        name: "Дополнительно",
        extra: {
            background: "#2F3440",
            image: advanced
        }
    },
    {
        key: "industrial_library",
        name: "Библиотека промптов",
        extra: {
            background: "#5F3C36",
            image: post_style
        }
    },
    {
        key: "create_post",
    },
    {
        key: "notifications",
        name: "Уведомления",
        extra: {
            background: "#525766",
            image: bell
        }
    },
    {
        key: "replenish",
        name: "Пополнить",
        extra: {
            background: "#5A3732",
            image: replenish
        }
    },
    {
        key: "profile",
        name: "Arseniy Popkov",
        extra: {
            image: replenish
        }
    },
    {
        key: "upload_media",
        name: "Загрузить медиа",
        extra: {
            background: "#1D3168",
            image: '',
            svg: <MediaIcon color="#336CFF"/>
        }
    },
    {
        key: "compilation_upload",
    },
    {
        key: "premoderation",
        name: "Премодерация",
        extra: {
            background: "#382B73",
            image: publications
        }
    },
    {
        key: "my_orders",
        name: "Мои заказы",
        extra: {
            background: "#552F43",
            image: promotion
        }
    },
    {
        key: "add_post",
        name: "Добавить пост",
        extra: {
            background: "#552F43",
            image: promotion
        }
    },
    {
        key: "live_preview_popup",
        name: "Лайв превью",
        extra: {
            background: "#1F326B",
            image: '',
            svg: <EyeIcon color="#336CFF" hoverColor="#336CFF" width={24} height={24}  cursor="default"/>
        }
    },
    {
        key: "subscriber_growth",
        name: "Подписчики",
    },
    {
        key: "subscriptions_day",
        name: "Подписки / Отписки за 24ч",
    },
    {
        key: "dynamics_posts",
        name: "Анализ просмотров",
    },
    {
        key: "average_advertising",
        name: "Средний охват / Рекламный",
    },
    {
        key: "average_coverage",
        name: "Средний охват одной публикации",
    },
    {
        key: "publications_analytics",
        name: "Публикации",
    },
]
