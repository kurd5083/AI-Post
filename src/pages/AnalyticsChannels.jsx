import styled from "styled-components";
import { useState } from "react";

import location_icon from "@/assets/location-icon.svg";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import FilterIcon from "@/icons/FilterIcon";

import CustomSelectThree from "@/shared/CustomSelectThree";

import AnalyticsHead from "@/components/Analytics/AnalyticsHead";
import AnalyticsStatistics from "@/components/Analytics/AnalyticsStatistics";
import ChannelInfo from "@/components/Analytics/ChannelInfo";
import StatisticsTab from "@/components/Analytics/StatisticsTab";
import PreviewTab from "@/components/Analytics/PreviewTab";

const AnalyticsChannels = () => {
  const [selectedFilter, setSelectedFilter] = useState("24h");
  const [activeTab, setActiveTab] = useState("statistics");

  const changeContent = (tab) => setActiveTab(tab);

  return (
    <AnalyticsContainer>
      <AnalyticsHead />
      <ChannelInfo />
      <ChannelInfoWrapper>
        <ChannelInfoBlock>
          <ChannelInfoLabel>Геопозиция:</ChannelInfoLabel>
          <ChannelInfoValue>
            <img src={location_icon} alt="location icon" />
            Россия
          </ChannelInfoValue>
        </ChannelInfoBlock>
        <ChannelInfoBlock>
          <ChannelInfoLabel>Категория:</ChannelInfoLabel>
          <ChannelInfoValue>
            <AiGeneratorIcon color="#336CFF" />Искусство
          </ChannelInfoValue>
        </ChannelInfoBlock>
      </ChannelInfoWrapper>
      <AnalyticsStatistics />
      <ContentHeadContainer>
        <ContentHead>
          <ContentHeadText
            $active={activeTab === "statistics"}
            onClick={() => changeContent("statistics")}
          >
            Статистика
          </ContentHeadText>
          <ContentHeadText
            $active={activeTab === "preview"}
            onClick={() => changeContent("preview")}
          >
            Превью
          </ContentHeadText>
        </ContentHead>
        <FilterBlock>
          <FilterIcon color="#D6DCEC" />
          <FilterText>Фильтр</FilterText>
          <CustomSelectThree
            options={[
              { id: '24h', label: '24 часа' },
              { id: '48h', label: '48 часов' },
            ]}
            value={selectedFilter}
            onChange={setSelectedFilter}
            width="min-content"
            right="-20px"
          />
        </FilterBlock>
      </ContentHeadContainer>
      {activeTab == "statistics" ? (
        <StatisticsTab />
      ) : (
        <PreviewTab />
      )}
    </AnalyticsContainer>
  )
}
const AnalyticsContainer = styled.div`
  
`
const ChannelInfoWrapper = styled.div`
  display: flex;
  gap: 70px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px 
	}	
  @media(max-width: 768px) { 
    padding: 0 24px
  }
`
const ChannelInfoBlock = styled.div`
  display: flex;
  gap: 10px;
`
const ChannelInfoLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #336CFF;
`
const ChannelInfoValue = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
`
const ContentHeadContainer = styled.div` 
  display: flex; 
  display: flex; 
  justify-content: space-between;
  margin-top: 40px; 
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;
const FilterBlock = styled.div` 
  display: flex; 
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #1A1F2D;
`;
const FilterText = styled.p`
  font-weight: 700;
  font-size: 14px;
`;
const ContentHead = styled.div` 
  display: flex; 
  gap: 40px;
`;
const ContentHeadText = styled.p`
  font-family: "Montserrat Alternates", sans-serif;
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;
  @media(max-width: 480px) { padding-right: 0; }
`;

export default AnalyticsChannels