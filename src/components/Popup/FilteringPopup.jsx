import { useState } from "react";
import styled from "styled-components";

import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";

import { useChannelById } from "@/lib/channels/useChannelById";
import { useAddChannelKeyword } from "@/lib/channels/filtration/useAddChannelKeyword";
import { useRemoveChannelKeyword } from "@/lib/channels/filtration/useRemoveChannelKeyword";
import { useAddChannelStopWord } from "@/lib/channels/filtration/useAddChannelStopWord";
import { useRemoveChannelStopWord } from "@/lib/channels/filtration/useRemoveChannelStopWord";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

const FilteringPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { channel } = useChannelById(channelId);
  const { addNotification } = useNotificationStore();

  const [keyword, setKeyword] = useState("");
  const [stopWord, setStopWord] = useState("");

  const keywords = channel?.keywords ?? [];
  const stopWords = channel?.stopWords ?? [];

  const { mutate: addKeyword } = useAddChannelKeyword();
  const { mutate: removeKeyword } = useRemoveChannelKeyword();
  const { mutate: addStopWord } = useAddChannelStopWord();
  const { mutate: removeStopWord } = useRemoveChannelStopWord();

  const handleAddKeyword = (k) => {
    const trimmed = k.trim();
    if (!trimmed || keywords.includes(trimmed)) return;

    addKeyword(
      { channelId, keyword: trimmed },
      {
        onSuccess: () =>
          addNotification(`Ключевое слово "${trimmed}" добавлено`, "success"),
        onError: (err) =>
          addNotification(
            err?.message || "Недостаточно прав для добавления ключевого слова",
            "error"
          ),
      }
    );
  };

  const handleRemoveKeyword = (k) => {
    const trimmed = k.trim();

    removeKeyword(
      { channelId, keyword: trimmed },
      {
        onSuccess: () =>
          addNotification(`Ключевое слово "${trimmed}" удалено`, "delete"),
        onError: (err) =>
          addNotification(
            err?.message || "Недостаточно прав для удаления ключевого слова",
            "error"
          ),
      }
    );
  };

  const handleAddStopWord = (w) => {
    const trimmed = w.trim();
    if (!trimmed || stopWords.includes(trimmed)) return;

    addStopWord(
      { channelId, stopWord: trimmed },
      {
        onSuccess: () =>
          addNotification(`Стоп-слово "${trimmed}" добавлено`, "success"),
        onError: (err) =>
          addNotification(
            err?.message || "Недостаточно прав для добавления стоп-слова",
            "error"
          ),
      }
    );
  };

  const handleRemoveStopWord = (w) => {
    const trimmed = w.trim();

    removeStopWord(
      { channelId, stopWord: trimmed },
      {
        onSuccess: () =>
          addNotification(`Стоп-слово "${trimmed}" удалено`, "delete"),
        onError: (err) =>
          addNotification(
            err?.message || "Недостаточно прав для удаления стоп-слова",
            "error"
          ),
      }
    );
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
            handleAddKeyword(keyword);
            setKeyword("");
          }}
        />

        {keywords.length === 0 ? (
          <EmptyText>Ключевые слова не добавлены</EmptyText>
        ) : (
          <BlocksItems
            items={keywords.map(k => ({ value: k }))}
            color="#EF6284"
            onRemove={handleRemoveKeyword}
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
            handleAddStopWord(stopWord);
            setStopWord("");
          }}
        />

        {stopWords.length === 0 ? (
          <EmptyText>Стоп слова не добавлены</EmptyText>
        ) : (
          <BlocksItems
            items={stopWords.map(w => ({ value: w }))}
            color="#EF6284"
            onRemove={handleRemoveStopWord}
          />
        )}
      </FilteringKey>
    </FilteringContainer>
  );
};

const FilteringContainer = styled.div`
  padding: 0 56px 30px;
  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }
`;
const FilteringText = styled.p`
  color: #6A7080;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  mark { color: #D6DCEC; }
  &:nth-of-type(2) { margin-top: 48px; }
`;
const FilteringKey = styled.div` margin-top: 40px; `;
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;

export default FilteringPopup;
