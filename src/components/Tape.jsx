import { useState } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import fire from "@/assets/tape/fire.svg";
import filter from "@/assets/tape/filter.svg";
import TapeList from "@/components/TapeList";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import CustomSelectSec from "@/shared/CustomSelectSec";
import BtnBase from "@/shared/BtnBase";
import { useNews } from "@/lib/news/useNews";

const Tape = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const { newsData, newsLoding } = useNews(filters);
  console.log(newsData)

  const [stopWord, setStopWord] = useState("");
  const [stopWords, setStopWords] = useState([]);
  const [priorityWord, setPriorityWord] = useState("");
  const [priorityWords, setPriorityWords] = useState([]);
  const [topic, setTopic] = useState(filters.topic || "");
  const [language, setLanguage] = useState(filters.language || "");
  const [isProcessed, setIsProcessed] = useState(filters.isProcessed || false);
  const [isPublished, setIsPublished] = useState(filters.isPublished || false);
  const [search, setSearch] = useState(filters.search || "");

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSave = () => {
    setFilters({
      stopWords: stopWords.join(","),
      priorityWords: priorityWords.join(","),
      topic,
      language,
      isProcessed,
      isPublished,
      search,
    });
  };

  return (
    <TapeContainer>
      <TapeHead>
        <TapeTitle>
          <img src={fire} alt="fire icon" />
          <mark>Лайв</mark> лента
        </TapeTitle>
        <TapeBtn onClick={handleFilterClick}>
          <img src={filter} alt="filter icon" />
          Фильтр
        </TapeBtn>
      </TapeHead>

      {isFilterOpen && (
        <FilterWrapper>
          <FilterTitle>Тема</FilterTitle>
          <CustomSelectSec
            options={[{ value: "test", label: "test" }]}
            value={topic}
            onChange={(option) => setTopic(option.value)}
            width="340px"
            fs="16px"
            padding="24px"
          />
          <FilterTitle>ЯЗЫК</FilterTitle>
          <CustomSelectSec
            options={[{ value: "ru", label: "Русский" }, { value: "en", label: "Английский" }]}
            value={language}
            onChange={(option) => setLanguage(option.value)}
            width="340px"
            fs="16px"
            padding="24px"
          />
          <FilterKeyCheckbox>
            <Checkbox checked={isProcessed} onChange={() => setIsProcessed(!isProcessed)}>
              <CheckboxText>Обработано</CheckboxText>
            </Checkbox>
            <Checkbox checked={isPublished} onChange={() => setIsPublished(!isPublished)}>
              <CheckboxText>Опубликовано</CheckboxText>
            </Checkbox>
          </FilterKeyCheckbox>
          <FilterKey>
            <InputPlus
              title="Стоп-слова"
              placeholder="Ключевое слово"
              bg="#2B243C"
              color="#FF55AD"
              fs="16px"
              padding="16px"
              value={stopWord}
              onChange={setStopWord}
              onSubmit={() => {
                if (!stopWord.trim()) return;
                setStopWords((prev) => [...prev, stopWord]);
                setStopWord("");
              }}
            />
            {stopWords.length === 0 ? (
              <EmptyText>Стоп-слова не добавлены</EmptyText>
            ) : (
              <BlocksItems
                items={stopWords.map((word, index) => ({ value: word, id: index }))}
                color="#EF6284"
                onRemove={(id) => {
                  setStopWords(prev => prev.filter((_, index) => index !== id));
                }}
              />
            )}

          </FilterKey>
          <FilterKey>
            <InputPlus
              title="Приоритетные слова"
              placeholder="Ключевое слово"
              bg="#2B243C"
              color="#FF55AD"
              fs="16px"
              padding="16px"
              value={priorityWord}
              onChange={setPriorityWord}
              onSubmit={() => {
                if (!priorityWord.trim()) return;
                setPriorityWords((prev) => [...prev, priorityWord]);
                setPriorityWord("");
              }}
            />
            {priorityWords.length === 0 ? (
              <EmptyText>Приоритетные слова не добавлены</EmptyText>
            ) : (
              <BlocksItems
                items={priorityWords.map((word, index) => ({ id: index, value: word }))}
                color="#EF6284"
                onRemove={(id) => {
                  setPriorityWords(prev => prev.filter((_, index) => index !== id));
                }}
              />
            )}
            
          </FilterKey>
            <FilterInput
              type="text"
              placeholder="Поиск по заголовку и содержимому"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          <BtnBase
            $color="#D6DCEC"
            $bg="#336CFF"
            $margin="40"
            onClick={() => {
              setFilters({
                stopWords: stopWords.join(","),
                priorityWords: priorityWords.join(","),
              });

              setIsFilterOpen(false);
            }}
          >
            Сохранить
          </BtnBase>
        </FilterWrapper>
      )}
      <TapeList
        newsData={newsData?.data || []}
        loading={newsLoding}
      />
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
  position: absolute;
  top: 180px;
  left: 0;
  width: calc(100% - 43px);
  border-radius: 24px;
  backdrop-filter: blur(64px);
  margin-top: 24px;
  padding: 24px;
  background-color: #202638cc;
  z-index: 100;
  max-height: calc(100dvh - 220px);
  overflow-y: auto;
  scrollbar-width: none;
  @media (max-width: 1400px) {
    left: 32px;
    max-height: 100dvh;
    width: calc(100% - 64px);
  }
  @media (max-width: 480px) {
    right: auto;
    top: 140px;
    left: 24px;
    width: calc(100% - 48px);
    max-height: 100dvh;
  }
`;
const FilterTitle = styled.h3`
  text-transform: uppercase;
  margin: 24px 0 16px;
  color: #6A7080;
  font-size: 12px;
  font-weight: 700;

  &:first-child {
    margin-top: 0;
  }
`
const FilterKey = styled.div`
  margin-top: 40px;
`
const FilterKeyCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`
const CheckboxText = styled.p`
  display: flex;
  align-items: center;
`
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;
const FilterInput = styled.input`
  margin-top: 40px; 
  background-color: transparent;
  color: #D6DCEC;
  font-size: 16px;
  font-weight: 700;
  border: none;

  &::placeholder {
    color: #6A7080;
  }
`;

export default Tape;