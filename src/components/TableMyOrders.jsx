import { useState } from "react";
import styled from 'styled-components';
import { useNotificationStore } from "@/store/notificationStore";
import ModernLoading from "@/components/ModernLoading";

const TableMyOrders = ({ promotionOrders, promotionOrdersPending }) => {
  const { addNotification } = useNotificationStore();
  const [copied, setCopied] = useState({});

  const handleCopy = (link, orderId) => {
    if (!link) {
      addNotification("Ссылка недоступна для копирования", "error");
      return;
    }
    navigator.clipboard.writeText(link);
    setCopied(prev => ({ ...prev, [orderId]: true }));
    addNotification("Ссылка скопирована в буфер обмена", "success");

    setTimeout(() => setCopied(prev => ({ ...prev, [orderId]: false })), 2000);
  };

  return (
    <TableContainer>
      {promotionOrdersPending ? (
        <ModernLoading text="Загрузка заказов..." />
      ) : (
        <TableWrapper>
          {promotionOrders?.length > 0 ? (
            <Table>
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <HeaderCell>Дата</HeaderCell>
                  <HeaderCell>Ссылка</HeaderCell>
                  <HeaderCell>Тип</HeaderCell>
                  <HeaderCell>Статус</HeaderCell>
                  <HeaderCell>Количество</HeaderCell>
                  <HeaderCell>Срок буста</HeaderCell>
                </tr>
              </thead>
              <tbody>
                {promotionOrders.map((order) => (
                  <TableItem key={order.id}>
                    <TableCell>
                      <CellDate>
                        <p>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</p>
                        <span>{new Date(order.createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</span>
                      </CellDate>
                    </TableCell>
                    <TableCell>
                      <CellOrdersLink>
                        <span>{order.link}</span>
                        <p onClick={() => handleCopy(order.link, order.id)}>
                          {copied[order.id] ? "Скопировано!" : "Скопировать"}
                        </p>
                      </CellOrdersLink>
                    </TableCell>
                    <TableCell>
                      {order.orderType === "VIEWS" ? "Просмотры" : order.orderType === "BOOST" ? "Буст" : "Общее"}
                    </TableCell>
                    <TableCell>
                      <TableCellStatus $status={order.success}>
                        <StatusIndicator $status={order.success} />
                        {order.success ? "Успешно" : 'Ошибка'}
                      </TableCellStatus>
                    </TableCell>
                    <TableCell>{order.quantity || order.minQuantity || 0}</TableCell>
                    <TableCell>{order.boostDays || "-"}</TableCell>
                  </TableItem>
                ))
                }

              </tbody>
            </Table>
          ) : (
            <EmptyBlock>Заказы не найдены</EmptyBlock>
          )}
        </TableWrapper>
      )}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  position: relative;
`;
const TableWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: calc(100dvh - 400px); 
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
  border-spacing: 0;
  margin-top: 16px;
  table-layout: fixed;
  border-collapse: separate;

  & colgroup col:first-child {
    width: 130px;
  }
  & colgroup col:nth-child(2) {
    width: 290px;
  }
  & colgroup col:nth-child(3) {
    width: 160px;
  }
  & colgroup col:nth-child(4) {
    width: 180px;
  }
  & colgroup col:nth-child(5) {
    width: 160px;
  }
  & colgroup col:nth-child(6) {
    width: 160px;
  }
`;
const HeaderCell = styled.th`
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
  padding: 20px 15px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;
const TableItem = styled.tr`
  &:last-child td { border-bottom: none; }
`;
const TableCell = styled.td`
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
  padding: 15px;
  border-bottom: 2px solid #2E3954;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;

const CellDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p { color: #D6DCEC; }
`;
const CellOrdersLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  span { color: #D6DCEC; }
  p { color: #336CFF; font-size: 12px; cursor: pointer; }
`;
const TableCellStatus = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.$status ? '#D6DCEC' : '#EF6284'};
`;
const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$status ? '#B5EC5B' : '#EF6284'};
  margin-right: 16px;
`;
const EmptyBlock = styled.div`
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  margin-top: 40px;
`;

export default TableMyOrders;