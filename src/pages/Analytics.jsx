import styled from "styled-components";
import { useState } from "react";

import list from "@/assets/list.svg";
import tape from "@/assets/tape.svg";

import CustomSelectThree from "@/shared/CustomSelectThree";
import BtnBase from "@/shared/BtnBase";

import PageHead from '@/components/PageHead'
import YourChannels from "@/components/Analytics/YourChannels";
import MonitoredChannels from "@/components/Analytics/MonitoredChannels";
import PageFilter from "@/components/PageFilter";

import { useDebounce } from "@/lib/useDebounce";

import useSearchStore from "@/store/searchStore";
import { usePopupStore } from "@/store/popupStore"

const categoriesData = [
  [
    { name: "Блоги", q: "171.6 k" },
    { name: "Новости и СМИ", q: "73.9 k" },
    { name: "Технологии", q: "21.5 k" },
    { name: "Юмор и развлечение", q: "62.1 k" },
    { name: "Экономика", q: "22.3 k" },
  ],
  [
    { name: "Маркетинг", q: "1211.6 k" },
    { name: "Политика", q: "13.9 k" },
    { name: "Дизайн", q: "2026.44 k" },
  ],
  [
    { name: "Игры", q: "1211.6 k" },
    { name: "Цитаты", q: "13.9 k" },
  ],
];

const Analytics = () => {
  const [active, setActive] = useState({ col: 0, index: 0 });
  const [viewMode, setViewMode] = useState("List");

  const { openPopup } = usePopupStore();
  const { searchQuery } = useSearchStore();
  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleChange = (newValue) => {
    if (!newValue) return;
    setViewMode(newValue);
  };

  return (
    <>
      <PageHead />
      <PageFilter filter={false} placeholder="Поиск каналов" />
      <AnalyticsContainer>
        <TitleContainer>
          <AnalyticsTitle>Ваши каналы</AnalyticsTitle>
          <AnalyticsButton>
            <BtnBase
              $bg="#336CFF"
              $color="#FFFFFF"
              $padding="14px 20px"
              onClick={() => openPopup("change_url", "popup_window")}
            >
              Отслеживать канал
            </BtnBase>
          </AnalyticsButton>
          <FilterBlock>
            <img src={viewMode === 'List' ? list : tape} alt="view icon" />
            <CustomSelectThree
              options={[
                { id: 'List', label: 'Список' },
                { id: 'Tape', label: 'Лента' },
              ]}
              value={viewMode}
              onChange={handleChange}
              width="min-content"
              right="-20px"
            />
          </FilterBlock>
        </TitleContainer>
        <YourChannels debouncedQuery={debouncedQuery} viewMode={viewMode} />
        <TitleContainer>
          <AnalyticsTitle>Отслеживаемые каналы</AnalyticsTitle>
        </TitleContainer>
        <MonitoredChannels debouncedQuery={debouncedQuery} />
        <TitleContainer>
          <AnalyticsTitleBig>Все категории</AnalyticsTitleBig>
        </TitleContainer>
        <AnalyticsCategories>
          {categoriesData.map((column, colIndex) => (
            <AnalyticsCategory key={colIndex}>
              {column.map((item, itemIndex) => {
                const isActive = active.col === colIndex && active.index === itemIndex;
                return (
                  <li
                    key={itemIndex}
                    className={isActive ? "active" : ""}
                    onClick={() => setActive({ col: colIndex, index: itemIndex })}
                  >
                    <p>{item.name}</p>
                    <span>{item.q}</span>
                  </li>
                );
              })}
            </AnalyticsCategory>
          ))}
        </AnalyticsCategories>
      </AnalyticsContainer>
    </>
  );
};

const AnalyticsContainer = styled.section`
  position: relative;
  padding-bottom:  30px;
`
const TitleContainer = styled.div` 
	display: flex;
	align-items: center;
	justify-content: space-between;
  gap: 40px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px 
	}	
  @media (max-width: 1400px) {
    justify-content: flex-start;
  }
  @media(max-width: 768px) { 
    flex-direction: column;
    gap: 20px;
    padding: 0 24px
  }
`;
const AnalyticsTitle = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
	font-size: 24px;
	font-weight: 700; 
  text-align: center;
`
const FilterBlock = styled.div` 
	display: flex;
	align-items: center;
	gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #1A1F2D;
`;
const AnalyticsButton = styled.div` 
  display: flex;
  justify-content: flex-end;
	flex-grow: 1;
`;

const AnalyticsTitleBig = styled.h2`
	font-size: 32px;
	font-weight: 700;
	margin-bottom: 40px;
`
const AnalyticsCategories = styled.div`
  display: flex;
	justify-content: space-between;
  flex-wrap: wrap;

	gap: 40px 120px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px 
	}	
  @media(max-width: 768px) { 
    padding: 0 24px
  }
`
const AnalyticsCategory = styled.ul`
	flex: 1;
  display: flex;
	flex-direction: column;
	gap: 40px;

	li {
		display: flex;
		justify-content: space-between;
    gap: 20px;
		font-size: 20px;
		font-weight: 600;
		color: #6A7080;
		cursor: pointer;
    min-width: 240px;

    p {
      flex: 1;
    }
		span {
			font-size: 14px;
			font-weight: 700;
      flex-grow: 0;
		}
		&.active {
      color: #336CFF;
    }

    &.active span {
      color: #D6DCEC;
    }
	}
`
export default Analytics
