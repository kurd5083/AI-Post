import { useState, useMemo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import EyeIcon from "@/icons/EyeIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import pointLine from "@/assets/point-line.svg";

import BtnBase from "@/shared/BtnBase";
import ChartHead from "@/components/Popup/Analytics/ChartHead";
import LineChart from "@/components/Analytics/LineChart";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const DynamicsPostsPopup = () => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const { dayPoints, dayLabels, dayFilter, dayPosts } = useAnalyticsStore();

  const selectedFilter = dayFilter;

  const points = useMemo(() => dayPoints.map(p => (Number(p) || 0) * (Number(selectedFilter) || 1)), [dayPoints, selectedFilter]);
  const labels = useMemo(() => dayLabels.map(l => l.short), [dayLabels]);

  const tooltipLabels = useMemo(() => dayLabels.map(l => l.medium), [dayLabels]);
  const hoverLabels = useMemo(() => dayLabels.map(l => l.full), [dayLabels]);

  return (
    <Container>
      <ChartHead content="dynamics_posts" />
      <ChartContainer>
        <LineChart
          points={points}
          labels={labels}
          tooltipLabels={tooltipLabels}
          hoverLabels={hoverLabels}
          width={700}
          height={300}
          type="dynamicsPosts"
          filter={selectedFilter}
          showGrid={true}
        />
      </ChartContainer>
      <TableHead>
        <TableTitle>Таблица</TableTitle>
        <BtnBase $padding="16px 24px">Выгрузить в Excel</BtnBase>
      </TableHead>
      <TableWrapper>
        <TableHeader>
          <HeaderCell>ДАТА</HeaderCell>
          <HeaderCell>ГРАФИК</HeaderCell>
          <HeaderCell>Статистика</HeaderCell>
          <StatisticsButtons>
            <StatisticsButton
              disabled={atStart}
              $disabled={atStart}
              className="StatisticsButtonPrev"
            >
              <ArrowIcon color="#D6DCEC" />
            </StatisticsButton >
            <StatisticsButton
              className="StatisticsButtonNext"
              disabled={atEnd}
              $disabled={atEnd}
            >
              <ArrowIcon color="#D6DCEC" />
            </StatisticsButton>
          </StatisticsButtons>
        </TableHeader>
        <TableRow>
          <TableCol>
            {dayPosts?.map((dynamic) => (
              <TableCell>
                <CellDate>
                  <DateName>Пост #{dynamic.post_id}</DateName>
                  <DateViews>
                    <EyeIcon color="#336CFF" hoverColor="#336CFF" width={18} height={18} cursor="default" />
                    {dynamic.total_views}
                  </DateViews>
                  <DateText>
                    {new Date(dynamic.post_date).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </DateText>
                  <DateReposts>
                    <img src={pointLine} alt="" />
                    {dynamic.reposts}
                  </DateReposts>
                  
                </CellDate>
              </TableCell>
            ))}
          </TableCol>
          <TableCol>
            {dayPosts?.map((dynamic) => (
              <TableCell>
                <MiniChart>
                  {(() => {
                    const max = Math.max(...(dynamic.hourly.data?.map(h => h.views) || [1]));

                    return dynamic.hourly.data?.map((h) => (
                      <Bar
                        key={h.hour_offset}
                        height={(h.views / max) * 60 + 4}
                        title={`${h.hour_offset}ч — ${h.views}`}
                      />
                    ));
                  })()}
                </MiniChart>
              </TableCell>
            ))}
          </TableCol>
          <CellStatistics
            spaceBetween={40}
            slidesPerView="auto"
            allowTouchMove={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".StatisticsButtonNext",
              prevEl: ".StatisticsButtonPrev",
            }}
            onReachBeginning={() => setAtStart(true)}
            onReachEnd={() => setAtEnd(true)}
            onFromEdge={() => {
              setAtStart(false);
              setAtEnd(false);
            }}
            onSlideChange={(swiper) => {
              setAtStart(swiper.isBeginning);
              setAtEnd(swiper.isEnd);
            }}
          >
            {dayPosts?.[0]?.hourly?.data?.map((_, hourIndex) => (
              <SwiperSlide key={hourIndex}>
                {dayPosts.map((post, postIndex) => {
                  const h = post.hourly?.data?.[hourIndex];

                  return (
                    <CellStatisticsContainer key={postIndex}>
                      <p>{hourIndex + 1} час</p>
                      <span>{h?.views ?? 0} просмотров</span>
                    </CellStatisticsContainer>
                  );
                })}
              </SwiperSlide>
            ))}

          </CellStatistics>
        </TableRow>
      </TableWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;

const TableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 56px;
  margin-top: 70px;

  @media(max-width: 1600px) { 
    padding: 0 32px; 
  }
  @media(max-width: 768px) { 
    padding: 0 24px; 
  }
`;
const ChartContainer = styled.div`
  display: grid;
	align-items: end;
	justify-items: start;
	grid-template-columns: 30px 1fr;
  grid-template-rows: 300px 30px;
  padding: 0 56px;
  margin-top: 40px;

  @media(max-width: 1600px) { 
    padding: 0 32px; 
  }
  @media(max-width: 768px) { 
    padding: 0 24px; 
  }
`;
const TableTitle = styled.h3`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 24px;
  font-weight: 700;
`;

const TableWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 56px;
  width: 100%;
  height: 300px;
  
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;

const TableHeader = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 64px;
`;

const HeaderCell = styled.p`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-transform: uppercase;
  z-index: 2;
  width: 150px;
  
  &:first-child {
    width: 200px;
  }
`;
const StatisticsButtons = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  justify-content: flex-end;
`;
const StatisticsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid  ${({ $disabled }) => ($disabled ? "#1C2438" : "transparent")};
  background-color: ${({ $disabled }) => ($disabled ? "transparent" : "#1C2438")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  flex-shrink: 0;

	&:first-child {
    transform: rotate(180deg);
  }
`
const TableRow = styled.div`
  display: flex;
  gap: 64px;
`;
const TableCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const TableCell = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
  font-size: 14px;
  font-weight: 700;
`;
const CellDate = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 48px;
  font-size: 14px;
  width: 200px;
`;
const DateName = styled.p`
  text-wrap: nowrap;
  color: #D6DCEC;
  font-weight: 700;
  grid-column: 1;
  grid-row: 1;
`;
const DateText = styled.p`
  grid-column: 1;
  grid-row: 2;
  text-wrap: nowrap;
`;
const DateViews = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  color: #D6DCEC;
  font-weight: 700;
  grid-column: 2;
  grid-row: 1;
`;
const DateReposts = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  color: #D6DCEC;
  font-weight: 700;
  grid-column: 2;
  grid-row: 2;
`;

const CellStatistics = styled(Swiper)`
  display: flex;
  flex-direction: column;
  margin: 0;

  .swiper-wrapper {
    display: flex;
  }

  .swiper-slide {
    width: auto;
  }
`;
const CellStatisticsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  height: 90px;

  p {
    font-weight: 700;
    color: #D6DCEC;
  }
  span {
    font-weight: 600;
    color: #6A7080;
  }
`;
const MiniChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 64px;
  width: 150px;
`;
const Bar = styled.div`
  width: 4px;
  height: ${({ height }) => height}px;
  background: #424E70;
  border-radius: 2px;
  transition: 0.15s;

  &:hover {
    opacity: 0.7;
  }
`;

export default DynamicsPostsPopup