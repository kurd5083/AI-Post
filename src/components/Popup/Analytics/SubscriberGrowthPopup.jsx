import { useMemo } from "react";
import styled from "styled-components";

import LineChart from "@/components/Analytics/LineChart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

import CustomSelect from "@/shared/CustomSelect";
import BtnBase from "@/shared/BtnBase";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const SubscriberGrowthPopup = () => {
  const { subscriberPoints, subscriberLabels, subscriberFilter } = useAnalyticsStore();
  const selectedFilter = subscriberFilter;

  const hoverLabels = useMemo(() => subscriberLabels.map(l => l.full), [subscriberLabels]);

  return (
    <Container>
      <ChartHead content="subscriber_growth"/>

      <ChartContainer>
        <LineChart
          points={subscriberPoints}
          labels={subscriberLabels}
          hoverLabels={hoverLabels}
          width={700}
          height={300}
          type="subscriber_growth"
          filter={selectedFilter}
          showGrid={true}
        />
      </ChartContainer>

      <TableHead>
        <TableTitle>Таблица</TableTitle>
        <BtnBase $padding="16px 24px">Выгрузить в Excel</BtnBase>
      </TableHead>
      <TableWrapper>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <HeaderCell>ДАТА</HeaderCell>
              <HeaderCell>Подписки</HeaderCell>
              <HeaderCell>Отписки</HeaderCell>
              <HeaderCell>Прирост</HeaderCell>
            </tr>
          </thead>
          <tbody>
            {subscriberLabels.map((sub, index) => {
              const delta = sub.delta ?? 0;
              const joined = sub.joined ?? 0;
              const left = sub.left ?? 0;
              const date = sub.full ?? sub.short;

              return (
                <tr key={index}>
                  <TableCell><CellDate>{date}</CellDate></TableCell>
                  <TableCell><CellSubscriptions>+ {joined}</CellSubscriptions></TableCell>
                  <TableCell><CellUnsubscriptions>- {left}</CellUnsubscriptions></TableCell>
                  <TableCell><CellGrowth $value={delta}>{delta > 0 ? "+" : ""}{delta}</CellGrowth></TableCell>
                </tr>
              );
            })}
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
	grid-template-columns: max-content 1fr;
  grid-template-rows: 300px 30px;
  gap: 0 10px;
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

  & colgroup col:nth-child(4) {
    width: 100px;
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
  color: #D6DCEC;
`;
const CellSubscriptions = styled.span`
  color: #B5EC5B;
`;
const CellUnsubscriptions = styled.span`
  color: #EC3F56;
`;
const CellGrowth = styled.span`
  color: ${({ $value }) => {
    if ($value > 0) return "#B5EC5B";
    if ($value < 0) return "#EC3F56";
    return "#6A7080";
  }};
`;

export default SubscriberGrowthPopup;
