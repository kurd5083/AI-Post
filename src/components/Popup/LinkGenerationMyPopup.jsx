import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import del from "@/assets/del.svg";
import hide from "@/assets/hide.svg"
import { useGetChannelInviteLinks } from "@/lib/channels/invite-link/useGetChannelInviteLinks";
import ModernLoading from "@/components/ModernLoading";

const LinkGenerationMyPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { links, linksLoading } = useGetChannelInviteLinks(channelId);
  return (
    <TableWrapper>
      {!linksLoading ? (
        members?.team?.length > 0 ? (
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
              {links.map((link) => (
                <TableItem key={link.id}>
                  <TableCell>{new Date(link.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{link.inviteLink}</TableCell>
                  <TableCell>{link.memberLimit}</TableCell>
                  <TableCell>{link.createsJoinRequest ? "Да" : "Нет"}</TableCell>
                  <TableCell>{link.isRevoked ? "Отозвана" : "Активна"}</TableCell>
                  <TableCell>{link.creator?.firstName || "-"}</TableCell>
                  <TableCell>
                    <HideButton>
                      <img src={hide} alt="hide icon" width={24} height={17} />
                    </HideButton>
                    <DeleteButton>
                      <img src={del} alt="del icon" width={14} height={16} />
                    </DeleteButton>
                  </TableCell>
                </TableItem>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>В канале пока нет ссылок</p>
        )
      ) : (
        <ModernLoading text="Загрузка ссылок..." />
      )}
    </TableWrapper>
  );
};
const TableWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 56px;
  margin-top: 48px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  & colgroup col:first-child {
    width: 25%;
    @media (max-width: 768px) {
      width: calc(50% - 24px);
    }
  }
  & colgroup col:nth-child(2) {
    width: 25%;
    @media (max-width: 768px) {
      width: calc(50% - 24px);
    }
  }
  & colgroup col:nth-child(3) {
    width: calc(50% - 48px);
    @media (max-width: 768px) {
      display: none;
    }
  }
  & colgroup col:nth-child(4) {
    width: 48px;
    @media (max-width: 480px) {
      width: 40px;
    }
  }
`;
const HeaderCell = styled.th`
  text-align: center;
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-transform: uppercase;
  &:first-child {
    text-align: left;
  }
  @media (max-width: 768px) {
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3) {
      display: none;
    }
  }
`;

const TableItem = styled.tr`
  &:last-child {
    td {
      border-bottom: none;
    }
  }
`;
const TableCell = styled.td`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 30px 0;
  border-bottom: 2px solid #2E3954;
  @media (max-width: 768px) {
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3) {
      display: none;
    }
  }
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
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
  margin-right: 16px;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`
export default LinkGenerationMyPopup
