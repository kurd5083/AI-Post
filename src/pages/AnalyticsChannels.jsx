import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import location_icon from "@/assets/location-icon.svg";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import FilterIcon from "@/icons/FilterIcon";

import CustomSelectThree from "@/shared/CustomSelectThree";

import AnalyticsHead from "@/components/Analytics/AnalyticsHead";
import ChannelInfo from "@/components/Analytics/ChannelInfo";
import StatisticsTab from "@/components/Analytics/StatisticsTab";
import PreviewTab from "@/components/Analytics/PreviewTab";
import AnalyticsStatistics from "@/components/Analytics/AnalyticsStatistics";


import { useGetTelescopeInfo } from "@/lib/channels/useGetTelescopeInfo";
import { useChannelById } from "@/lib/channels/useChannelById";
import { useAnalyticsFilterStore } from "@/store/analyticsFilterStore";

const AnalyticsChannels = () => {
  const [activeTab, setActiveTab] = useState("statistics");
  const { id } = useParams();
  const { channel } = useChannelById(Number(id));
  const { channelInfo } = useGetTelescopeInfo(channel?.channelId);

  const changeContent = (tab) => setActiveTab(tab);

  const selectedFilter = useAnalyticsFilterStore((state) => state.selectedFilter);
  const setSelectedFilter = useAnalyticsFilterStore((state) => state.setSelectedFilter);

  const [dateRange, setDateRange] = useState(getDateRange(selectedFilter));

  function getDateRange(filter) {
    const now = new Date();
    let fromDate = new Date(now);

    switch (filter) {
      case "24h": fromDate.setHours(now.getHours() - 24); break;
      case "week": fromDate.setDate(now.getDate() - 7); break;
      case "month": fromDate.setMonth(now.getMonth() - 1); break;
      case "year": fromDate.setFullYear(now.getFullYear() - 1); break;
      default: fromDate.setMonth(now.getMonth() - 1);
    }

    const formatDateTimeLocal = (d) => {
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    const formatDateShort = (d) => d.toISOString().split("T")[0];

    return {
      dateFromStr: formatDateTimeLocal(fromDate),
      dateToStr: formatDateTimeLocal(now),
      dateFromShort: formatDateShort(fromDate),
      dateToShort: formatDateShort(now)
    }
  }
useEffect(() => {
    setDateRange(getDateRange(selectedFilter));
  }, [selectedFilter]);
  const handleChange = (newValue) => {
    if (!newValue) return;
    setSelectedFilter(newValue);
    setDateRange(getDateRange(newValue));
  };

  if (!channel || !channelInfo) return null;

  return (
    <AnalyticsContainer>
      <AnalyticsHead />
      <ChannelInfo channel={channelInfo.channel} />
      <ChannelInfoWrapper>
        <ChannelInfoBlock>
          <ChannelInfoLabel>Геопозиция:</ChannelInfoLabel>
          <ChannelInfoValue>
            <img src={location_icon} alt="location icon" />
            {channelInfo.channel.region}
          </ChannelInfoValue>
        </ChannelInfoBlock>
        <ChannelInfoBlock>
          <ChannelInfoLabel>Категория:</ChannelInfoLabel>
          <ChannelInfoValue>
            <AiGeneratorIcon color="#336CFF" />Искусство
          </ChannelInfoValue>
        </ChannelInfoBlock>
      </ChannelInfoWrapper>
      <AnalyticsStatistics id={channel?.id} channelId={channel?.channelId} />
      <ContentHeadContainer>
        <ContentHead>
          <ContentHeadText $active={activeTab === "statistics"} onClick={() => changeContent("statistics")}>
            Статистика
          </ContentHeadText>
          <ContentHeadText $active={activeTab === "preview"} onClick={() => changeContent("preview")}>
            Превью
          </ContentHeadText>
        </ContentHead>

        {activeTab === "statistics" && (
          <FilterBlock>
            <FilterIcon color="#D6DCEC" />
            <FilterText>Фильтр</FilterText>
            <CustomSelectThree
              options={[
                { id: '24h', label: '24 часа' },
                { id: 'week', label: 'Неделя' },
                { id: 'month', label: 'Месяц' },
                { id: 'year', label: 'Год' },
              ]}
              value={selectedFilter}
              onChange={handleChange}
              width="min-content"
              right="-20px"
            />
          </FilterBlock>
        )}
      </ContentHeadContainer>

      {activeTab === "statistics" ? (
        <StatisticsTab
          channel_id={channel.channelId}
          dateFromStr={dateRange.dateFromStr}
          dateToStr={dateRange.dateToStr}
          dateFromShort={dateRange.dateFromShort}
          dateToShort={dateRange.dateToShort}
          filter={selectedFilter}
        />
      ) : (
        <PreviewTab channel_id={channel.channelId} id={channel.id} channelName={channel.name} />
      )}
    </AnalyticsContainer>
  );
};
const AnalyticsContainer = styled.div`
  
`
const ChannelInfoWrapper = styled.div`
  display: flex;
  gap: 70px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px;
	}	
  @media(max-width: 768px) { 
    padding: 0 24px;
    gap: 40px;
  }
`
const ChannelInfoBlock = styled.div`
  display: flex;
  gap: 10px;
  @media(max-width: 768px) { 
    flex-direction: column;
  }
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
  justify-content: space-between;
  gap: 32px;
  margin-top: 40px; 
  padding: 0 56px;

  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { 
    flex-direction: column;
    align-items: flex-start;
    padding: 0 24px 
  }
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