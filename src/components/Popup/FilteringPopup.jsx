import { useEffect, useState } from "react";
import styled from "styled-components";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import { usePopupStore } from "@/store/popupStore";
import { useChannelById } from "@/lib/channels/useChannelById";
import { useAddChannelKeyword } from "@/lib/channels/filtration/useAddChannelKeyword";
import { useRemoveChannelKeyword } from "@/lib/channels/filtration/useRemoveChannelKeyword";
import { useAddChannelStopWord } from "@/lib/channels/filtration/useAddChannelStopWord";
import { useRemoveChannelStopWord } from "@/lib/channels/filtration/useRemoveChannelStopWord";
import BtnBase from "@/shared/BtnBase";
import { useNotificationStore } from "@/store/notificationStore";

const FilteringPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { channel } = useChannelById(channelId);
  const { addNotification } = useNotificationStore();

  const [keyword, setKeyword] = useState("");
  const [stopWord, setStopWord] = useState("");

  const [localKeywords, setLocalKeywords] = useState([]);
  const [localStopWords, setLocalStopWords] = useState([]);

  const { mutate: addKeyword, isPending: addKeywordPending } = useAddChannelKeyword();
  const { mutate: removeKeyword, isPending: removeKeywordPending } = useRemoveChannelKeyword();
  const { mutate: addStopWord, isPending: addStopWordPending } = useAddChannelStopWord();
  const { mutate: removeStopWord, isPending: removeStopWordPending } = useRemoveChannelStopWord();

  const isPending =
    addKeywordPending ||
    removeKeywordPending ||
    addStopWordPending ||
    removeStopWordPending;

  useEffect(() => {
    if (!channel) return;

    setLocalKeywords((prev) =>
      prev.length ? prev : channel.keywords ?? []
    );
    setLocalStopWords((prev) =>
      prev.length ? prev : channel.stopWords ?? []
    );
  }, [channel]);

  const handleSave = () => {
    if (!channel) return;

    const serverKeywords = channel.keywords ?? [];
    const serverStopWords = channel.stopWords ?? [];

    const keywordsChanged =
      localKeywords.filter(k => !serverKeywords.includes(k)).length > 0 ||
      serverKeywords.filter(k => !localKeywords.includes(k)).length > 0;

    const stopWordsChanged =
      localStopWords.filter(w => !serverStopWords.includes(w)).length > 0 ||
      serverStopWords.filter(w => !localStopWords.includes(w)).length > 0;

    if (!keywordsChanged && !stopWordsChanged) {
      addNotification("Нет изменений для сохранения", "info");
      return;
    }

    localKeywords
      .filter(k => !serverKeywords.includes(k))
      .forEach(keyword => {
        addKeyword({ channelId, keyword });
      });

    localStopWords
      .filter(w => !serverStopWords.includes(w))
      .forEach(stopWord => {
        addStopWord({ channelId, stopWord });
      });

    serverKeywords
      .filter(k => !localKeywords.includes(k))
      .forEach(keyword => {
        removeKeyword({ channelId, keyword });
      });

    serverStopWords
      .filter(w => !localStopWords.includes(w))
      .forEach(stopWord => {
        removeStopWord({ channelId, stopWord });
      });

    addNotification("Фильтры успешно обновлены", "update");
  };

  return (
    <FilteringContainer>
      <FilteringText>
        Добавьте ключевые слова для фильтрации новостей по заголовкам, или<br />
        оставьте список пустым, чтобы получать все новости. <mark>В Telegram-каналах <br />
          и группах/пабликах VK</mark> поиск осуществляется по всему содержанию.
      </FilteringText>

      <FilteringKey>
        <InputPlus
          title="Ключевые слова"
          placeholder="Введите ключевое слово"
          bg="#2B243C"
          color="#FF55AD"
          value={keyword}
          onChange={setKeyword}
          onSubmit={() => {
            if (!keyword.trim()) return;

            setLocalKeywords(prev =>
              prev.includes(keyword) ? prev : [...prev, keyword]
            );
            setKeyword("");
          }}
        />

        {localKeywords.length === 0 ? (
          <EmptyText>Ключевые слова не добавлены</EmptyText>
        ) : (
          <BlocksItems
            items={localKeywords.map((k) => ({ value: k }))}
            color="#EF6284"
            onRemove={(value) => {
              setLocalKeywords(prev => prev.filter(k => k !== value));
            }}
          />
        )}
      </FilteringKey>

      <FilteringText>
        Добавьте стоп-слова, чтобы исключить нежелательные новости по заголовкам. <br />
        В Telegram-каналах и группах/пабликах VK стоп-слова применяются<br />
        <mark> ко всему содержанию.</mark>
      </FilteringText>

      <FilteringKey>
        <InputPlus
          title="Стоп-слова"
          placeholder="Введите стоп-слово"
          bg="#2B243C"
          color="#FF55AD"
          value={stopWord}
          onChange={setStopWord}
          onSubmit={() => {
            if (!stopWord.trim()) return;

            setLocalStopWords(prev =>
              prev.includes(stopWord) ? prev : [...prev, stopWord]
            );
            setStopWord("");
          }}
        />

        {localStopWords.length === 0 ? (
          <EmptyText>Стоп слова не добавлены</EmptyText>
        ) : (
          <BlocksItems
            items={localStopWords.map((w) => ({ value: w }))}
            color="#EF6284"
            onRemove={(value) => {
              setLocalStopWords(prev => prev.filter(w => w !== value));
            }}
          />
        )}
      </FilteringKey>
      <BtnBase
        $margin="64"
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? "Сохраняем..." : "Сохранить"}
      </BtnBase>
    </FilteringContainer>
  );
};

const FilteringContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const FilteringText = styled.p`
  color: #6A7080;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  mark {
    color: #D6DCEC;
  }
  &:nth-of-type(2) {
    margin-top: 48px;
  }
`
const FilteringKey = styled.div`
  margin-top: 40px;
`
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;

export default FilteringPopup