import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import ModernLoading from "@/components/ModernLoading";
import { useNotificationStore } from "@/store/notificationStore";
import { usePromotionOrders } from "@/lib/channels/promotion/useGetPromotionOrders";
import CustomSelect from "@/shared/CustomSelect";

const MyOrdersPopup = () => {
  const [copied, setCopied] = useState(false);
  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { addNotification } = useNotificationStore();

  const [filterType, setFilterType] = useState("");
  const [filterSuccess, setFilterSuccess] = useState("");

  const { myOrders, myOrdersPending, refetch } = usePromotionOrders({
    channelId,
    page: 1,
    limit: 50,
    orderType: filterType || undefined,
    success: filterSuccess !== "" ? filterSuccess === "true" : undefined,
  });

  useEffect(() => {
    if (channelId) {
      refetch();
    }
  }, [filterType, filterSuccess, channelId]);

  const handleCopy = (link) => {
    if (!link) {
      addNotification("Ссылка недоступна для копирования", "error");
      return;
    }
    navigator.clipboard.writeText(link);
    setCopied(link);
    addNotification("Ссылка скопирована в буфер обмена", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const typeOptions = [
    { value: "", label: "Все типы" },
    { value: "VIEWS", label: "Просмотры" },
    { value: "BOOST", label: "Буст" },
    { value: "GENERAL", label: "Общее" },
  ];

  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "true", label: "Успешно" },
    { value: "false", label: "Ошибка" },
  ];

  return (
    <OrdersContainer>
      <OrdersHead>
        <OrdersHeadText onClick={() => changeContent("promotion")}>Просмотр</OrdersHeadText>
        <OrdersHeadText onClick={() => changeContent("boosts")}>Бусты</OrdersHeadText>
        <OrdersHeadText $active={true}>Мои заказы</OrdersHeadText>
      </OrdersHead>
      <Filters>
        <CustomSelect
          options={typeOptions}
          value={filterType}
          onChange={(opt) => setFilterType(opt.value)}
          placeholder="Тип заказа"
        />
        <CustomSelect
          options={statusOptions}
          value={filterSuccess}
          onChange={(opt) => setFilterSuccess(opt.value)}
          placeholder="Статус"
        />
      </Filters>

      {myOrdersPending ? (
        <ModernLoading text="Загрузка заказов..." />
      ) : (
        <>
          {myOrders?.data?.length > 0 ? (
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
                {myOrders?.data?.map((order) => (
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
                        <p onClick={() => handleCopy(order.link)}>
                          {copied === order.link ? "Скопировано!" : "Скопировать"}
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
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyBlock>Заказов пока нет</EmptyBlock>
          )}
        </>
      )}
    </OrdersContainer>
  );
};

const OrdersContainer = styled.div`
  padding: 0 56px 30px;
  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }
`;

const OrdersHead = styled.div` display: flex; gap: 32px; `;
const OrdersHeadText = styled.p`
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

const Filters = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0 16px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  margin-top: 16px;
  table-layout: fixed;
  border-collapse: separate;
`;
const HeaderCell = styled.th`
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
  padding: 20px 0;
`;
const TableItem = styled.tr`
  &:last-child td { border-bottom: none; }
`;
const TableCell = styled.td`
  font-size: 14px;
  font-weight: 700;
  border-bottom: 2px solid #2E3954;
  color: #6A7080;
  padding: 15px 0;
`;
const CellDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p { color: #D6DCEC; }
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
const CellOrdersLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  span { color: #D6DCEC; }
  p { color: #336CFF; font-size: 12px; cursor: pointer; }
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

export default MyOrdersPopup;
