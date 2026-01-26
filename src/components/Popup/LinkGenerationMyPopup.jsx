import { useState } from "react";
import styled from "styled-components";

import del from "@/assets/del.svg";
import DelIcon from "@/icons/DelIcon";
import EyeIcon from "@/icons/EyeIcon";

import Empty from "@/shared/Empty";
import ModernLoading from "@/components/ModernLoading";

import { useGetChannelInviteLinks } from "@/lib/channels/invite-link/useGetChannelInviteLinks";
import { useRemoveInviteLink } from "@/lib/channels/invite-link/useRemoveInviteLink";

import { useNotificationStore } from "@/store/notificationStore";
import { usePopupStore } from "@/store/popupStore";


const LinkGenerationMyPopup = () => {
  const [copied, setCopied] = useState(false);

  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { addNotification } = useNotificationStore();

  const { links, linksLoading } = useGetChannelInviteLinks(channelId);
  const { mutate: removeLink, isPending: removePending } = useRemoveInviteLink();

  const handleCopy = (link) => {
    if (!link?.inviteLink) {
      addNotification("Ссылка недоступна для копирования", "error");
      return;
    }

    navigator.clipboard.writeText(link.inviteLink);
    setCopied(link.id);
    addNotification("Ссылка скопирована в буфер обмена", "success");

    setTimeout(() => setCopied(false), 2000);
  };
  const formatDateTime = (iso) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return { date: "-", time: "-" };

    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);

    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return {
      date: `${dd}.${mm}.${yy}`,
      time: `${hh}:${min}`,
    };
  };

  return (
    <TableWrapper>
      {!linksLoading ? (
        links?.length > 0 ? (
          <Table>
            <colgroup>
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
                <HeaderCell>ДАТА</HeaderCell>
                <HeaderCell>Ссылка</HeaderCell>
                <HeaderCell>Подписки</HeaderCell>
                <HeaderCell>Отписки</HeaderCell>
                <HeaderCell>итог</HeaderCell>
                <HeaderCell>статус</HeaderCell>
                <HeaderCell />
              </tr>
            </thead>
            <tbody>
              {links.map((link) => {
                const { date, time } = formatDateTime(link.createdAt);

                return (
                  <tr key={link.id}>
                    <TableCell>
                      <CellDate>
                        <p>{date}</p>
                        <span>{time}</span>
                      </CellDate>
                    </TableCell>
                    <TableCell>
                      <CellInviteLink>
                        <span>{link.inviteLink}</span>
                        <p onClick={() => handleCopy(link)}>
                          {copied === link.id ? "Скопировано!" : "Скопировать"}
                        </p>
                      </CellInviteLink>
                    </TableCell>
                    <TableCell>+ {link.netJoins}</TableCell>
                    <TableCell>- {link.leavesCount}</TableCell>
                    <TableCell>= {link.joinsCount}</TableCell>
                    <TableCell>
                      <CellStatus>
                        Активно
                      </CellStatus>
                    </TableCell>
                    <TableCellActions>
                      <HideButton>
                        <EyeIcon/>
                      </HideButton>
                      <DeleteButton
                        disabled={removePending}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (removePending) return;

                          changeContent("delete_confirm", "popup_window", {
                            itemName: link.inviteLink,
                            onDelete: () => removeLink(link.id),
                          });
                        }}
                      >
                        <img src={del} alt="del icon" width={14} height={16} />
                      </DeleteButton>
                    </TableCellActions>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Empty icon="🔗">В канале пока нет ссылок</Empty>
        )
      ) : (
        <ModernLoading text="Загрузка ссылок..." />
      )}
    </TableWrapper>
  );
};
const TableWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 56px 30px;
  width: 100%;
  overflow: auto;
  scrollbar-width: none;
  
  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  table-layout: fixed;

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
    width: 160px;
  }
  & colgroup col:nth-child(5) {
    width: 120px;
  }
  & colgroup col:nth-child(6) {
    width: 160px;
  }
  & colgroup col:nth-child(7) {
    width: 105px;
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
`;
const TableCellActions = styled.td`
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
`;

const CellDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    color: #D6DCEC;
  }
`;
const CellInviteLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  span {
    color: #D6DCEC;
  }
  p {
    color: #336CFF;
    font-size: 12px;
    cursor: pointer;
  }
`;
const CellStatus = styled.p`
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 16px;
    height: 16px;
    background-color: #B5EC5B;
    border-radius: 50%;
  }
`;
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
`;
const HideButton = styled(BaseButton)`
  border: 2px solid #2D3241;
  margin-right: 8px;
`;
const DeleteButton = styled(BaseButton)`
  border: 2px solid #2D3241;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`
export default LinkGenerationMyPopup
