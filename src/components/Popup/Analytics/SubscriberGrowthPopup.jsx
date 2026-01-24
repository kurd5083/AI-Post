import { useState } from "react";
import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelect";

import Chart from "@/components/Popup/Analytics/Chart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

const subscriber = [
  {
    id: 1,
    date: "25 Декабря 2025, Ср",
    subscriptions: 502,
    unsubscriptions: 41,
  },
  {
    id: 2,
    date: "24 Декабря 2025, Вт",
    subscriptions: 430,
    unsubscriptions: 38,
  },
  {
    id: 3,
    date: "23 Декабря 2025, Пн",
    subscriptions: 610,
    unsubscriptions: 55,
  },
  {
    id: 4,
    date: "22 Декабря 2025, Вс",
    subscriptions: 390,
    unsubscriptions: 27,
  },
  {
    id: 5,
    date: "21 Декабря 2025, Сб",
    subscriptions: 720,
    unsubscriptions: 63,
  },
];

const SubscriberGrowthPopup = ({ data }) => {
  const [dateFilter, setDateFilter] = useState({ period: "", value: "" });
  return (
    <Container>
      <ChartHead />
      <Chart data={data} />
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
        {/* {!linksLoading ? ( */}
        {/* // links?.length > 0 ? ( */}
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
              <HeaderCell>прирост</HeaderCell>
            </tr>
          </thead>
          <tbody>
            {subscriber.map((subscrib) => {
              const growth = subscrib.subscriptions - subscrib.unsubscriptions;

              return (
                <tr key={subscrib.id}>
                  <TableCell>
                    <CellDate>{subscrib.date}</CellDate>
                  </TableCell>
                  <TableCell>
                    <CellSubscriptions>+ {subscrib.subscriptions}</CellSubscriptions>
                  </TableCell>
                  <TableCell>
                    <CellUnsubscriptions>- {subscrib.unsubscriptions}</CellUnsubscriptions>
                  </TableCell>
                  <TableCell>
                    <CellGrowth $value={growth}>
                      {growth > 0 ? "+" : ""}
                      {growth}
                    </CellGrowth>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* // ) : (
                // <EmptyLink>В канале пока нет ссылок</EmptyLink>
              // )
            // ) : (
              // <ModernLoading text="Загрузка ссылок..." />
            // )} */}
      </TableWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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

const EmptyLink = styled.p`
  box-sizing: border-box;
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
`
export default SubscriberGrowthPopup;
