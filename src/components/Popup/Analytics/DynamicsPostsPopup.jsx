import { useState, useMemo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import EyeIcon from "@/icons/EyeIcon";

import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelect";
import ChartHead from "@/components/Popup/Analytics/ChartHead";
import LineChart from "@/components/Analytics/LineChart";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const DynamicsPostsPopup = () => {
  const [dateFilter, setDateFilter] = useState({ period: "", value: "" });

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
        <HeadActions>
          <CustomSelect
            placeholder="Уточнить"
            value={dateFilter.value}
            options={[
              { value: "", label: "За сутки" },
              { value: "7", label: "За 7 дней" },
              { value: "30", label: "За 30 дней" },
            ]}
            onChange={(option) =>
              setDateFilter((prev) => ({ ...prev, value: option.value }))
            }
            width="165px"
            fs="14px"
          />
          <BtnBase $padding="16px 24px">Выгрузить в Excel</BtnBase>
        </HeadActions>
      </TableHead>

      <TableWrapper>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <HeaderCell>ДАТА</HeaderCell>
              <HeaderCell>ГРАФИК</HeaderCell>
              <HeaderCell>Статистика</HeaderCell>
            </tr>
          </thead>
          <tbody>
            {dayPosts?.map((dynamic) => (
              <tr key={dynamic.post_id}>
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
                  </CellDate>
                </TableCell>

                <TableCell>
                  <MiniChart>
                    {(() => {
                      const max = Math.max(...(dynamic.hourly?.map(h => h.views) || [1]));

                      return dynamic.hourly?.map((h) => (
                        <Bar
                          key={h.hour_offset}
                          height={(h.views / max) * 60 + 4}
                          title={`${h.hour_offset}ч — ${h.views}`}
                        />
                      ));
                    })()}
                  </MiniChart>
                </TableCell>

                <TableCell>
                  <CellStatistics>
                    {dynamic.hourly?.map((h) => (
                        <CellStatisticsContainer>
                          <p>{h.hour_offset} час</p>
                          <span>{h.views} просмотров</span>
                        </CellStatisticsContainer>
                    ))}
                  </CellStatistics>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
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
  margin-top: 40px;

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
  grid-template-rows: 300px 20px;
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
const HeadActions = styled.div`
  display: flex;
  gap: 20px;
`;

const TableWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 56px;
  width: 100%;
  height: 300px;
  overflow: auto;
  scrollbar-width: none;
  
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  table-layout: fixed;

  & colgroup col:nth-child(1) {
    width: 300px;
  }
  & colgroup col:nth-child(2) {
    width: 150px;
  }
`;
const HeaderCell = styled.th`
  text-align: left;
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-transform: uppercase;
  z-index: 2;
  padding: 20px 0;
`;
const TableCell = styled.td`
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
  padding: 15px 0;
  font-size: 14px;
  font-weight: 700;
`;
const CellDate = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 48px;
  font-size: 14px;
`;
const DateName = styled.p`
  color: #D6DCEC;
  font-weight: 700;
  grid-column: 1;
  grid-row: 1;
`;
const DateText = styled.p`
  grid-column: 1;
  grid-row: 2;
`;
const DateViews = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #D6DCEC;
  font-weight: 700;
  grid-column: 2;
  grid-row: 1;
`;

const CellStatistics = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 40px;
`;
const CellStatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  p {
    font-weight: 700;
    color: #D6DCEC;
  }
`;
const MiniChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 64px;
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