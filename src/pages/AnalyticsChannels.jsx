import { useState, useMemo } from "react";
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
import ModernLoading from "@/components/ModernLoading";

import { useGetTelescopeInfo } from "@/lib/channels/useGetTelescopeInfo";
import { useChannelById } from "@/lib/channels/useChannelById";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const AnalyticsChannels = () => {
  const [activeTab, setActiveTab] = useState("statistics");
  const { id } = useParams();
  const { channel } = useChannelById(Number(id));
  const { channelInfo, channelPending } = useGetTelescopeInfo(channel?.channelId);
  const changeContent = (tab) => setActiveTab(tab);

  const {
    dayFilter,
    subscriberFilter,
    adReachFilter,
    postsByPeriodFilter,
    averageCoverageAvgFilter,
    setDayFilter,
    setSubscriberFilter,
    setAdReachFilter,
    setPostsByPeriodFilter,
    setAverageCoverageAvgFilter,
  } = useAnalyticsStore();

  const handleChange = (newFilter) => {
    if (!newFilter) return;
    setDayFilter(newFilter);
    setSubscriberFilter(newFilter);
    setAdReachFilter(newFilter);
    setPostsByPeriodFilter(newFilter);
    setAverageCoverageAvgFilter(newFilter);
  };
  const dateRange = useMemo(() =>
    getDateRange({
      dayFilter,
      subscriberFilter,
      adReachFilter,
      postsByPeriodFilter,
      averageCoverageAvgFilter,
    }),
    [
      dayFilter,
      subscriberFilter,
      adReachFilter,
      postsByPeriodFilter,
      averageCoverageAvgFilter,
    ]
  );

  function getDateRange(filters) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");

    const formatDateTimeLocal = (d) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    const formatDateShort = (d) => d.toISOString().split("T")[0];

    const calcRange = (filter) => {
      let fromDate = new Date(now);
      switch (filter) {
        case "24h": fromDate.setHours(now.getHours() - 24); break;
        case "week": fromDate.setDate(now.getDate() - 7); break;
        case "month": fromDate.setMonth(now.getMonth() - 1); break;
        case "year": fromDate.setFullYear(now.getFullYear() - 1); break;
        default: fromDate.setMonth(now.getMonth() - 1);
      }
      return {
        dateFromStr: formatDateTimeLocal(fromDate),
        dateToStr: formatDateTimeLocal(now),
        dateFromShort: formatDateShort(fromDate),
        dateToShort: formatDateShort(now)
      };
    };

    return {
      dayFilterRange: calcRange(filters.dayFilter),
      subscriberFilterRange: calcRange(filters.subscriberFilter),
      adReachFilterRange: calcRange(filters.adReachFilter),
      postsByPeriodFilterRange: calcRange(filters.postsByPeriodFilter),
      averageCoverageAvgFilterRange: calcRange(filters.averageCoverageAvgFilter),
    };
  }
  return (
    <>
      {channelPending ? (
        <ModernLoading text="Загрузка аналитики..." />
      ) : (
        <>
          <AnalyticsHead />
          <ChannelInfo channel={channelInfo?.channel} />
          <ChannelInfoWrapper>
            <ChannelInfoBlock>
              <ChannelInfoLabel>Геопозиция:</ChannelInfoLabel>
              <ChannelInfoValue>
                <img src={location_icon} alt="location icon" />
                {channelInfo?.channel.region}
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
                  value={dayFilter}
                  onChange={handleChange}
                  width="min-content"
                  right="-20px"
                />
              </FilterBlock>
            )}
          </ContentHeadContainer>
          {activeTab === "statistics" ? (
            <StatisticsTab
              id={channel.id}
              channel_id={channel.channelId}
              dateRanges={dateRange}
            />
          ) : (
            <PreviewTab channel_id={channel.channelId} id={channel.id} channelName={channel.name} channelAva={channelInfo?.channel.avatar_url} />
          )}
        </>
      )}

    </>
  );
};


const ChannelInfoWrapper = styled.div`
  display: flex;
  gap: 70px;
  padding: 0 56px;
  @media(max-width: 1600px){ padding: 0 32px; }
  @media(max-width: 768px){ padding: 0 24px; gap: 40px; }
`;

const ChannelInfoBlock = styled.div`
  display: flex;
  gap: 10px;
  @media(max-width: 768px){ flex-direction: column; }
`;

const ChannelInfoLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #336CFF;
`;

const ChannelInfoValue = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
`;

const ContentHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  margin-top: 40px;
  padding: 0 56px;
  @media(max-width: 1600px){ padding: 0 32px; }
  @media(max-width: 768px){ flex-direction: column; align-items: flex-start; padding: 0 24px; }
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
  @media(max-width: 480px){ padding-right: 0; }
`;

export default AnalyticsChannels;
