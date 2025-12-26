import posting from "@/assets/popup/posting.svg";
import image_generation from "@/assets/popup/image-generation.svg";
import text from "@/assets/popup/text.svg";
import activate_promotion from "@/assets/popup/activate-promotion.svg";
import SourcePost from "@/icons/SourcePost";

export const advancedDatas = [

  {
    key: 'forced_posting',
    title: "Принудительный постинг",
    desc: "Сервис будет брать последнюю статью из источников, в случае если по найдем ключевым словам ничего не найдено или все новости были уже опубликованы",
    extra: {
      background: "#5D443A",
      image: posting
    }
  },
  {
    key: "disable_media",
    title: "Отключить медиа",
    desc: "Пост не будет содержать в себе картинку или видео, даже если они есть в найденной новости",
    extra: {
      background: "#31542C",
      image: image_generation
    }
  },
  {
    key: "transferring_source_text",
    title: "Перенос исходного текста",
    desc: "Текста из найденной новости будет перенесён без изменений. Работает только с Telegram - каналами и пабликами / группами VK в  качестве источников",
    extra: {
      background: "#562F43",
      image: text
    }
  },
  {
    key: "add_link_post",
    title: "Добавить ссылку в пост",
    desc: "В посте будет указан URL исходной статьи",
    extra: {
      background: "#4A6455",
      image: activate_promotion
    }
  },
  {
    key: "add_source_post",
    title: "Добавить источник в пост",
    desc: "В посте будет указан сайт исходной статьи",
    extra: {
      background: "#2F5F62",
      image: '',
      icon: <SourcePost color="#66FFE8"/>,
    }
  },
];
