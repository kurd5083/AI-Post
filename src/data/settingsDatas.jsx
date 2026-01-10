import posting from "@/assets/popup/posting.svg";
import mode from "@/assets/popup/mode.svg";
import publications from "@/assets/popup/publications.svg";
import activate_promotion from "@/assets/popup/activate-promotion.svg";
import promotion from "@/assets/popup/promotion.svg";
import auto_accepting from "@/assets/popup/auto-accepting.svg";
import link_generation  from "@/assets/popup/link-generation.svg";
import my_team  from "@/assets/popup/my-team.svg";
import image_generation  from "@/assets/popup/image-generation.svg";
import filtering from "@/assets/popup/filtering.svg";
import calendar from "@/assets/popup/calendar.svg";
import schedule from "@/assets/popup/schedule.svg";
import sources from "@/assets/popup/sources.svg";
import post_style  from "@/assets/popup/post-style.svg";
import advanced from "@/assets/popup/advanced.svg";
import PlusIcon from "@/icons/PlusIcon";

export const settingsDatas = {
    sections: [
        {
            label: "Основные",
            items: [
                {
                    key: "posting",
                    name: "Постинг",
                    status: true,
                    size: true,
                    right: 'switch',
                    extra: {
                        background: "#5D443A",
                        image: posting
                    }
                },
                {
                    key: "mode",
                    name: "Режим",
                    size: true,
                    right: 'textarrow',
                    extra: {
                        background: "#1F326B",
                        image: mode
                    }
                },
                {
                    key: "publications",
                    name: "Публикации",
                    size: true,
                    extra: {
                        background: "#382B73",
                        image: publications
                    }
                },
                {
                    key: "create_post",
                    name: "Создать пост",
                    right: 'arrow',
                    size: true,
                    extra: {
                        background: "#44336D",
                        image: '',
                        svg: <PlusIcon color="#D6DCEC"/>
                    }
                }
            ]
        },
        {
            label: "Продвижение",
            items: [
                // {
                //     key: "activate_promotion",
                //     name: "Активировать продвижение",
                //     status: true,
                //     right: 'switch',
                //     extra: {
                //         background: "#445838",
                //         image: activate_promotion
                //     }, 
                // },
                {
                    key: "promotion",
                    name: "Продвижение",
                    right: 'arrow',
                    extra: {
                        background: "#552F43",
                        image: promotion
                    }
                }
            ]
        },
        {
            label: "Управление",
            items: [
                {
                    key: "auto_accepting",
                    name: "Автоприём заявок",
                    right: 'switch',
                    extra: {
                        background: "#2E5E5F",
                        image: auto_accepting
                    },
                },
                {
                    key: "link_generation_prev",
                    name: "Генерация ссылок",
                    right: 'arrow',
                    extra: {
                        background: "#603642",
                        image: link_generation
                    }
                }
            ]
        },
        {
            label: "Администрирование",
            items: [
                {
                    key: "my_team",
                    name: "Моя команда",
                    right: 'arrow',
                    extra: {
                        background: "#2F4F6D",
                        image: my_team
                    }
                }
            ]
        },
        {
            label: "Настройки",
            items: [
                {
                    key: "image_generation",
                    name: "Генерация изображений",
                    right: 'arrow',
                    extra: {
                        background: "#375930",
                        image: image_generation
                    }
                },
                {
                    key: "filtering",
                    name: "Фильтрация",
                    right: 'arrow',
                    extra: {
                        background: "#643358",
                        image: filtering
                    }
                },
                {
                    key: "calendar",
                    name: "Календарь",
                    right: 'arrow',
                    extra: {
                        background: "#47346C",
                        image: calendar
                    }
                },
                {
                    key: "schedule",
                    name: "Расписание",
                    right: 'imgarrow',
                    extra: {
                        background: "#5F6046",
                        image: schedule
                    }
                },
                {
                    key: "sources",
                    name: "Источники",
                    right: 'arrow',
                    extra: {
                        background: "#203F67",
                        image: sources
                    }
                },
                {
                    key: "post_style",
                    name: "Стиль промптов",
                    right: 'arrow',
                    extra: {
                        background: "#5F3C36",
                        image: post_style
                    }
                },
                {
                    key: "advanced",
                    name: "Дополнительно",
                    right: 'arrow',
                    extra: {
                        background: "#2F3440",
                        image: advanced
                    }
                }
            ]
        }
    ]
};
