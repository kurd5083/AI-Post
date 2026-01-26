import { useState } from "react";
import styled from "styled-components";

import pointLine from "@/assets/point-line.svg";
import EyeIcon from "@/icons/EyeIcon";

import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelect";

import Chart from "@/components/Popup/Analytics/Chart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";
const dynamics = [
  {
    id: 1,
    postId: 4561224,
    views: "1.5k",
    sent: "14",
    date: "19 Января, 19:35",
    stats: [
      { hour: 1, percent: 35.8, value: 305.53 },
      { hour: 2, percent: 12.3, value: 74.24 },
      { hour: 3, percent: 64.1, value: 645.88 },
      { hour: 4, percent: 18.2, value: 175.32 },
      { hour: 5, percent: 75.9, value: 662.16 },
    ],
  },
  {
    id: 2,
    postId: 4561225,
    views: "2.3k",
    sent: "14",
    date: "18 Января, 18:10",
    stats: [
      { hour: 1, percent: 22.4, value: 150.1 },
      { hour: 2, percent: 44.7, value: 380.3 },
      { hour: 3, percent: 61.2, value: 590.2 },
      { hour: 4, percent: 72.5, value: 810.7 },
      { hour: 5, percent: 85.3, value: 1020.4 },
    ],
  },
  {
    id: 2,
    postId: 4561225,
    views: "2.3k",
    sent: "14",
    date: "18 Января, 18:10",
    stats: [
      { hour: 1, percent: 22.4, value: 150.1 },
      { hour: 2, percent: 44.7, value: 380.3 },
      { hour: 3, percent: 61.2, value: 590.2 },
      { hour: 4, percent: 72.5, value: 810.7 },
      { hour: 5, percent: 85.3, value: 1020.4 },
    ],
  },
  {
    id: 2,
    postId: 4561225,
    views: "2.3k",
    sent: "14",
    date: "18 Января, 18:10",
    stats: [
      { hour: 1, percent: 22.4, value: 150.1 },
      { hour: 2, percent: 44.7, value: 380.3 },
      { hour: 3, percent: 61.2, value: 590.2 },
      { hour: 4, percent: 72.5, value: 810.7 },
      { hour: 5, percent: 85.3, value: 1020.4 },
    ],
  },
];

const DynamicsPostsPopup = ({ data }) => {
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
          </colgroup>
          <thead>
            <tr>
              <HeaderCell>ДАТА</HeaderCell>
              <HeaderCell>ГРАФИК</HeaderCell>
              <HeaderCell>Статистика</HeaderCell>
            </tr>
          </thead>
          <tbody>
            {dynamics.map((dynamic) => (
              <tr key={dynamic.id}>
                <TableCell>
                  <CellDate>
                    <DateName>Пост #{dynamic.postId}</DateName> 
                    <DateViews>
                      <EyeIcon color="#336CFF" hoverColor="#336CFF" width={16} height={13} cursor="default" />
                      {dynamic.views}
                    </DateViews>
                    <Date>{dynamic.date}</Date> 
                    <DateSent><img src={pointLine} alt="" />{dynamic.sent}</DateSent>
                  </CellDate>
                </TableCell>

                <TableCell />

                <TableCell>
                  <CellStatistics>
                    {dynamic.stats.map((s) => (
                      <CellStatisticsContaoner key={s.hour}>
                        <p>{s.hour} час</p>
                        <span>{s.percent}% ({s.value})</span>
                      </CellStatisticsContaoner>
                    ))}
                  </CellStatistics>
                </TableCell>
              </tr>
            ))}
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

  )
}
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
const Date = styled.p`
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
const DateSent = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #D6DCEC;
  font-weight: 700;
  grid-column: 2;
  grid-row: 2;
`;
const CellStatistics = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
`;
const CellStatisticsContaoner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  p {
    font-weight: 700;
    color: #D6DCEC;
  }
`;

export default DynamicsPostsPopup