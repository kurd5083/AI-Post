
import generate_post from "@/assets/popup/generate-post.svg";
import post_style from "@/assets/popup/post-style.svg";
import choose_post from "@/assets/popup/choose-post.svg";

export const createpostcommon = [
    {
        key: "create_post",
        title: "Сгенерировать пост",
        desc: "Автоматическая генерация с помощью ИИ",
        extra: {
            background: "#44336D",
            image: generate_post
        }
    },
    {
        key: "create_post_manually",
        title: "Создать пост вручную",
        desc: "Написать пост самостоятельно",
        extra: {
            background: "#5F3937",
            image: post_style
        }
    },
    {
        key: "choose_post",
        title: "Выбрать пост",
        desc: "Выбрать готовый пост",
        extra: {
            background: "#485C3B",
            image: choose_post
        }
    }
];
