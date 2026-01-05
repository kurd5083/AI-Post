import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import { useChannelById } from "@/lib/channels/useChannelById";
import { useAddChannelSource } from "@/lib/channels/sources/useAddChannelSource";
import { useDeleteChannelSource } from "@/lib/channels/sources/useDeleteChannelSource";
import { useNotificationStore } from "@/store/notificationStore";
import { v4 as uuidv4 } from "uuid";

const SourcesPopup = () => {
  const { popup, changeContent } = usePopupStore()
  const channelId = popup?.data?.channelId;
  const { channel } = useChannelById(channelId);
  const { addNotification } = useNotificationStore();

  const [url, setUrl] = useState("");
  const [localSources, setLocalSources] = useState([]);

  const { mutate: addSource } = useAddChannelSource();
  const { mutate: deleteSource } = useDeleteChannelSource();

  useEffect(() => {
    if (channel?.sources) {
      setLocalSources(channel.sources);
    }
  }, [channel]);

  // функция для проверки и извлечения домена
  const parseUrlDomain = (input) => {
    try {
      let formatted = input.trim();
      if (!formatted.startsWith("http")) formatted = "https://" + formatted; // на случай, если пользователь забыл https
      const urlObj = new URL(formatted);
      return urlObj.hostname; // вернет t.me или другой домен
    } catch (err) {
      return null; // если URL некорректный
    }
  }

  const handleAddSource = () => {
    const domain = parseUrlDomain(url);

    if (!domain) {
      return addNotification("Введите корректный URL источника", "error");
    }

    const tempId = `temp-${uuidv4()}`;
    setLocalSources(prev => [...prev, { id: tempId, name: domain }]);
    addSource({ channelId, url }); // сохраняем полную ссылку
    addNotification("Источник успешно добавлен", "update");
    setUrl("");
  };

  const handleRemoveSource = (id) => {
    setLocalSources(prev => prev.filter((s) => s.id !== id));
    if (!String(id).startsWith("temp-")) {
      deleteSource({ channelId, sourceId: id });
      addNotification("Источник успешно удалён", "update");
    }
  };

  return (
    <SourcesContainer>
      <SourcesText>
        Здесь вы можете добавить источник, откуда сервис будет брать посты. Отображается <mark>имя и URL.</mark>
      </SourcesText>
      <SourcesKey>
        <SourcesKeyTitle>Мои источники:</SourcesKeyTitle>
        <InputPlus
          title="Введите источник"
          bg="#142136"
          color="#2B89ED"
          fs="14px"
          value={url}
          onChange={setUrl}
          onSubmit={handleAddSource}
        />
        {localSources.length === 0 ? (
          <EmptyText>Источники не добавлены</EmptyText>
        ) : (
          <BlocksItems
            items={localSources.map((source) => ({ value: source.name, id: source.id }))}
            color="#2B89ED"
            onRemove={handleRemoveSource}
          />
        )}
      </SourcesKey>
      <SourcesButtons>
        <BtnBase
          $margin="40"
          onClick={() => changeContent("compilation")}
          $color="#D6DCEC"
          $bg="#2B89ED"
        >
          Подборки источников
        </BtnBase>
      </SourcesButtons>
    </SourcesContainer>
  )
}

const SourcesContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const SourcesText = styled.p`
  color: #6A7080;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  max-width: 400px;

  mark {
    color: #D6DCEC;
  }
  &:nth-of-type(2) {
    margin-top: 48px;
  }
`
const SourcesKey = styled.div`
  margin-top: 40px;
`
const SourcesKeyTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 40px;
`
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;
const SourcesButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default SourcesPopup