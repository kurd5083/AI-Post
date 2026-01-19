import styled from "styled-components";
import { useState } from "react";

import PageHead from '@/components/PageHead'
import YourChannels from "@/components/Analytics/YourChannels";
import MonitoredChannels from "@/components/Analytics/MonitoredChannels";
import PageFilter from "@/components/PageFilter";

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

  return (
    <>
      <PageHead />
      <PageFilter filter={false} placeholder="Поиск каналов" />
      <AnalyticsContainer>
        <AnalyticsTitle>Ваши каналы</AnalyticsTitle>
        <YourChannels />
        <AnalyticsTitle>Отслеживаемые каналы</AnalyticsTitle>
        <MonitoredChannels />
        <AnalyticsTitleBig>Отслеживаемые каналы</AnalyticsTitleBig>
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
                    {item.name}
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
	padding: 0 56px 30px;

  @media(max-width: 1600px) { 
    padding: 0 32px 30px 
	}	
  @media(max-width: 768px) { 
    padding: 0 24px 30px
  }
`
const AnalyticsTitle = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 40px;
`
const AnalyticsTitleBig = styled.h2`
	font-size: 32px;
	font-weight: 700;
	margin-bottom: 40px;
`
const AnalyticsCategories = styled.div`
  display: flex;
	justify-content: space-between;
	gap: 120px;
`
const AnalyticsCategory = styled.ul`
	flex: 1;
  display: flex;
	flex-direction: column;
	gap: 40px;

	li {
		display: flex;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 600;
		color: #6A7080;
		cursor: pointer;

		span {
			font-size: 14px;
			font-weight: 700;
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
