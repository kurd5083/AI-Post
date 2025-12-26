import choose_post from "@/assets/popup/choose-post.svg";
import CloseIcon from "@/icons/CloseIcon";
import calendar_blue from "@/assets/popup/calendar-blue.svg";

export const notificationsDatas = [
    {
        key: "create_post",
        title: "Пост “Сценарий войн” был завершен показами.",
        extra: {
            background: "#374938",
            image: choose_post
        }
    },
    {
        key: "create_post_manually",
        title: "Пост “Сценарий войн” был отменён.",
        extra: {
            background: "#41293C",
            image: '',
            svg: <CloseIcon color="#EF6284"/>
        }
    },
    {
        key: "choose_post",
        title: "План на 16.02.2025 выполнен",
        extra: {
            background: "#1E2A58",
            image: calendar_blue
        }
    }
];
