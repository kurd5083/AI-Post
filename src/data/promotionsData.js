import post from "@/assets/promotion/post.svg";
import subscriber from "@/assets/promotion/subscriber.svg";
import reaction from "@/assets/promotion/reaction.svg";
import boost from "@/assets/promotion/boost.svg";

export const promotionsData = [
    {
        id: 1,
        title: "Увеличение просмотров постов",
        description: "Привлечение просмотров к вашим постам для повышения охвата",
        icon: post,
        area: "Telegram",
    },
    {
        id: 2,
        title: "Привлечение подписчиков",
        description: "Органическое привлечение новых подписчиков в канал",
        icon: subscriber,
        area: "Telegram",
    },
    {
        id: 3,
        title: "Накрутка реакций",
        description: "Продвижение через рекламные каналы и боты",
        icon: reaction,
        area: "Telegram",
    },
    {
        id: 4,
        title: "Повышение буста",
        description: "Увеличение реакций, комментариев и репостов",
        icon: boost,
        area: "Instagram",
    }
]