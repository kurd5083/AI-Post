import posting from "@/assets/popup/posting.svg";
import image_generation from "@/assets/popup/image-generation.svg";
import text from "@/assets/popup/text.svg";
import activate_promotion from "@/assets/popup/activate-promotion.svg";


export const advancedDatas = [

  {
    title: "Принудительный постинг",
    desc: "Сервис будет брать последнюю статью из источников, в случае если по найдем ключевым словам ничего не найдено или все новости были уже опубликованы",
    extra: {
      background: "#5D443A",
      image: posting
    }
  },
  {
    title: "Отключить медиа",
    desc: "Пост не будет содержать в себе картинку или видео, даже если они есть в найденной новости",
    extra: {
      background: "#31542C",
      image: image_generation
    }
  },
  {
    title: "Перенос исходного текста",
    desc: "Текста из найденной новости будет перенесён без изменений. Работает только с Telegram - каналами и пабликами / группами VK в  качестве источников",
    extra: {
      background: "#562F43",
      image: text
    }
  },
  {
    title: "Добавить ссылку в пост",
    desc: "В посте будет указан URL исходной статьи",
    extra: {
      background: "#4A6455",
      image: activate_promotion
    }
  },
  {
    title: "Добавить источник в пост",
    desc: "В посте будет указан сайт исходной статьи",
    extra: {
      background: "#1F326B",
      image: activate_promotion
    }
  },
];
