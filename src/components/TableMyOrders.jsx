import styled from 'styled-components';
import del from "@/assets/del.svg";
import { tableMyOrdersDatas } from "@/data/tableMyOrdersDatas";
import useResolution from "@/lib/useResolution";

const TableMyOrders = () => {
  const { isSmall } = useResolution();

  return (
    <TableContainer>
      <TableWrapper>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Название</HeaderCell>
              <HeaderCell>Дата</HeaderCell>
              <HeaderCell>Ссылка</HeaderCell>
              <HeaderCell>Сумма</HeaderCell>
              <HeaderCell>Стартовое число</HeaderCell>
              <HeaderCell>Кол-во</HeaderCell>
              <HeaderCell>Статус</HeaderCell>
              <HeaderCell>Осталось</HeaderCell>
              <HeaderCell></HeaderCell>
            </tr>
          </thead>
          <tbody>
            {tableMyOrdersDatas.map((row) => (
              <tr key={row.id}>
                <TableCell>
                  <TableCellNum>{row.number}</TableCellNum>
                </TableCell>
                <TableCell>
                  <TableCellName>
                    <img src={row.image} alt="Group" />
                    <span>{row.name}</span>
                  </TableCellName>
                </TableCell>
                <TableCell>{row.data}</TableCell>
                <TableCell>
                  <TableCellLink href={row.link || "tg.me/owadawd"} target="_blank">
                    {isSmall ? row.link?.split('/').pop() || "tg.me/..." : row.link || "tg.me/owadawd"}
                  </TableCellLink>
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.starting}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  <TableCellOnline $online={row.online}>
                    <StatusIndicator $online={row.online} />
                    {row.online ? 'Онлайн' : 'Ошибка'}
                  </TableCellOnline>
                </TableCell>
                <TableCell>{row.remained}</TableCell>
                <TableCell>
                  <ButtonDel title="Удалить"><img src={del} alt="del icon" width={14} height={16} /></ButtonDel>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  position: relative;
`;
const TableWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: calc(100svh - 400px); 
  min-height: 400px;
  overflow: auto;
  scrollbar-width: none;
  padding: 0 56px;
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
  border-spacing: 0 20px;
  table-layout: fixed;

  @media(max-width: 768px) {
    border-spacing: 0;
  }

  & colgroup col:first-child {
    width: 58px;
  }
  & colgroup col:nth-child(2) {
    width: 276px;
  }
  & colgroup col:nth-child(3) {
    width: 163px;
  }
  & colgroup col:nth-child(4) {
    width: 209px;
  }
  & colgroup col:nth-child(5) {
    width: 152px;
  }
  & colgroup col:nth-child(6) {
    width: 176px;
  }
  & colgroup col:nth-child(7) {
    width: 143px;
  }
  & colgroup col:nth-child(8) {
    width: 180px;
  }
  & colgroup col:nth-child(9) {
   width: 134px;
  }
  & colgroup col:last-child {
    width: 40px;
  }
`;
const HeaderCell = styled.th`
  text-align: left;
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-transform: uppercase;
  position: sticky;
  top: 0px;
  z-index: 2;
  padding: 20px 0;
  background-color: #131826;
`;
const TableCell = styled.td`
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
  padding: 15px 0;
`;
const TableCellNum = styled.span`
  color: #D6DCEC;
`;
const TableCellName = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  color: #D6DCEC;
  img {
    margin: 0 24px 0 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    object-fit: cover;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const TableCellLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;
const TableCellOnline = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.$online ? '#D6DCEC' : '#EF6284'};
`;
const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$online ? '#B5EC5B' : '#EF6284'};
  margin-right: 16px;
`;
const ButtonDel = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: all 0.2s;
  border: 2px solid #2F3953;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`;

export default TableMyOrders;