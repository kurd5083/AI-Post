import { useState, useEffect } from "react";
import styled from "styled-components";

import fire from "@/assets/tape/fire.svg";
import FilterIcon from "@/icons/FilterIcon";

import CustomSelect from "@/shared/CustomSelect";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import BtnBase from "@/shared/BtnBase";
import TapeList from "@/components/TapeList";

import { useNews } from "@/lib/news/useNews";
import { useNotificationStore } from "@/store/notificationStore";
import { useCreatePersonalNewsFeed } from "@/lib/news/usePersonalNewsFeed";
import { useGetPersonalNewsFeedId } from "@/lib/news/useGetPersonalNewsFeedId";

const Tape = () => {
  const { newsFeed, newsFeedsLoading } = useGetPersonalNewsFeedId();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [updateInterval, setUpdateInterval] = useState(60);


  const { newsData, newsPending } = useNews(filters);

  const [sourceWord, setSourceWord] = useState("");
  const [sourceWords, setSourceWords] = useState([]);

  const [stopWord, setStopWord] = useState("");
  const [stopWords, setStopWords] = useState([]);

  const [priorityWord, setPriorityWord] = useState("");
  const [priorityWords, setPriorityWords] = useState([]);

  useEffect(() => {
    if (newsFeed) {
      setUpdateInterval(newsFeed.updateIntervalMinutes || 60);
      setSourceWords(newsFeed.sources?.map(s => s.url) || []);
    }
  }, [newsFeed]);

  const { mutate: createFeed, isPending: feedPending } = useCreatePersonalNewsFeed();
  const { addNotification } = useNotificationStore();

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSave = () => {
    const payload = {
      // name: feedName,
      categories: [],
      // sourceIds: [],
      sourceLinks: sourceWords,
      // customSources: [],
      updateIntervalMinutes: updateInterval,
      isEnabled: true,
      // description: feedDescription,
    };

    createFeed(payload,
      {
        onSuccess: () => {
          setFilters({
            stopWords: stopWords.join(","),
            priorityWords: priorityWords.join(","),
            language: "ru",
            page: "1",
            limit: "10",
          });

          addNotification("Лента создана", "success");
          setIsFilterOpen(false);
        },
        onError: (err) => {
          addNotification(err.message || "Ошибка создания ленты", "error");
        },
      }
    );
  };
  const handleAddWord = ({ word, words, setWords, emptyMessage, existsMessage, successMessage, clearInput, }) => {
    if (!word.trim()) return;

    if (words.includes(word)) {
      addNotification(existsMessage, "info");
      return;
    }

    setWords(prev => [...prev, word]);
    addNotification(successMessage(word), "success");
    clearInput("");
  };
  return (
    <TapeContainer>
      <TapeHead>
        <TapeTitle>
          <img src={fire} alt="fire icon" />
          {isFilterOpen ? (
            <><mark>Фильтр</mark> ленты</>
          ) : (
            <><mark>Лайв</mark> лента</>
          )}
        </TapeTitle>
        <TapeBtn onClick={handleFilterClick}>
          <FilterIcon color="#D6DCEC" />
          Фильтр
        </TapeBtn>
      </TapeHead>
      {isFilterOpen ? (
        <FilterWrapper>
          <FilterInterval>
            <h3>Интервал</h3>
            <CustomSelect
              placeholder="Выберите интервал"
              options={[
                { value: 15, label: "15 минут" },
                { value: 30, label: "30 минут" },
                { value: 60, label: "1 час" },
                { value: 180, label: "3 часа" },
                { value: 360, label: "6 часов" },
              ]}
              value={updateInterval}
              width="160px"
              onChange={(option) => setUpdateInterval(option.value)}
            />
          </FilterInterval>
          <FilterKey>
            <InputPlus
              title="Введите источник"
              placeholder="Введите источник"
              bg="#152136"
              color="#336CFF"
              fs="16px"
              padding="16px"
              value={sourceWord}
              onChange={setSourceWord}
              onSubmit={() => {
                handleAddWord({
                  word: sourceWord,
                  words: sourceWords,
                  setWords: setSourceWords,
                  existsMessage: "Источник уже добавлен",
                  successMessage: w => `Источник "${w}" добавлен`,
                  clearInput: setSourceWord,
                });
              }}
            />
            {sourceWords.length === 0 ? (
              <EmptyText>Источники не добавлены</EmptyText>
            ) : (
              <BlocksItems
                items={sourceWords.map((word, index) => ({ id: index, value: word }))}
                color="#336CFF"
                onRemove={(id) => {
                  setSourceWords(prev => prev.filter((_, index) => index !== id));
                  addNotification("Источник удален", "delete");
                }}
              />
            )}
          </FilterKey>
          <FilterKey>
            <InputPlus
              title="Приоритетные слова"
              placeholder="Введите приоритетное слово"
              bg="#152136"
              color="#336CFF"
              fs="16px"
              padding="16px"
              value={priorityWord}
              onChange={setPriorityWord}
              onSubmit={() => {
                handleAddWord({
                  word: priorityWord,
                  words: priorityWords,
                  setWords: setPriorityWords,
                  existsMessage: "Приоритетное слово уже добавлено",
                  successMessage: w => `Приоритетное слово "${w}" добавлено`,
                  clearInput: setPriorityWord,
                });
              }}
            />
            {priorityWords.length === 0 ? (
              <EmptyText>Приоритетные слова не добавлены</EmptyText>
            ) : (
              <BlocksItems
                items={priorityWords.map((word, index) => ({ id: index, value: word }))}
                color="#336CFF"
                onRemove={(id) => {
                  setPriorityWords(prev => prev.filter((_, index) => index !== id));
                  addNotification("Приоритетное слово удалено", "delete");
                }}
              />
            )}
          </FilterKey>
          <FilterKey>
            <InputPlus
              title="Стоп-слова"
              placeholder="Введите стоп-слово"
              bg="#152136"
              color="#336CFF"
              fs="16px"
              padding="16px"
              value={stopWord}
              onChange={setStopWord}
              onSubmit={() => {
                handleAddWord({
                  word: stopWord,
                  words: stopWords,
                  setWords: setStopWords,
                  existsMessage: "Стоп-слово уже добавлено",
                  successMessage: w => `Стоп-слово "${w}" добавлено`,
                  clearInput: setStopWord,
                });
              }}
            />
            {stopWords.length === 0 ? (
              <EmptyText>Стоп-слова не добавлены</EmptyText>
            ) : (
              <BlocksItems
                items={stopWords.map((word, index) => ({ value: word, id: index }))}
                color="#336CFF"
                onRemove={(id) => {
                  setStopWords(prev => prev.filter((_, index) => index !== id));
                  addNotification("Стоп-слово удалено", "delete");
                }}
              />
            )}
          </FilterKey>
          <BtnBase
            $color="#D6DCEC"
            $bg="#336CFF"
            $margin="64"
            $width="100%"
            onClick={handleSave}
            disabled={feedPending}
          >
            {feedPending ? "Сохраняем..." : "Сохранить"}
          </BtnBase>
        </FilterWrapper>
      ) : (
        <TapeList
          newsData={newsData?.data || []}
          pending={newsPending}
        />
      )}

    </TapeContainer>
  );
};

const TapeContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  padding: 40px 24px 32px;
  background: #131826;
  max-width: 430px;
  width: 100%;
  padding: 35px 43px 0 0;
  overflow: hidden;
  z-index: 0;

  @media (max-width: 1600px) {
    max-width: 370px;
  }
  @media(max-width: 1400px) {
    max-width: 100%;
    padding: 32px 0;
    overflow: visible;
  }

  &::after {
    content: '';
    position: absolute;
    right: -100px;
    top: -150px;
    width: 200px;   
    height: 200px;
    background: #1844C2;
    filter: blur(60px);
    @media(max-width: 1400px) {
      display: none;
    }
  }
`;

const TapeHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`;

const TapeTitle = styled.h1`
  display: flex;
  flex-direction: column;
  line-height: 48px;
  font-size: 48px;
  font-weight: 900;
  @media (max-width: 480px) {
    flex-direction: row;
    gap: 16px;
    align-items: center;
    line-height: 40px;
    font-size: 40px;
  }
  img {
    width: 25px;
    height: 32px;
    margin-bottom: 20px;
    @media (max-width: 480px) {
      margin-bottom: 0px;
    }
  }
  
  mark {
    position: relative;
    color: transparent;
    background: radial-gradient(circle, #FFBD5A, #EF6284, #5D2076, #5B1F74);
    background-size: 250px;
    background-position: -30px;
    background-clip: text;
  }
`;

const TapeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #1A1F2D;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #232834;
  }
  
  &:active {
    background-color: #2C3241;
  }
`;
const FilterWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 40px;
  padding-bottom: 30px;
  max-height: calc(100dvh - 220px);
  overflow-y: auto;
  scrollbar-width: none;
  @media (max-width: 1400px) {
    margin: 40px 32px 0;
    width: auto;
  }
  @media (max-width: 768px) {
    margin: 40px 24px 0;
  }
  @media (max-width: 480px) {
  }
`;
 
const FilterInterval = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h3 {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
  }
`
const FilterKey = styled.div`
  margin-bottom: 40px;
`
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;

export default Tape;