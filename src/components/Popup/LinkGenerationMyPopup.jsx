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
  console.log(links)
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
              {links.map((link) => (
                <tr key={link.id}>
                  <TableCell>{new Date(link.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <CellInviteLink>
                      <a>{link.inviteLink}</a>
                      <span>Скопировать</span>
                    </CellInviteLink>
                  </TableCell>
                  <TableCell>+ 500</TableCell>
                  <TableCell>- 200</TableCell>
                  <TableCell>= 300</TableCell>
                  <TableCell>
                    <CellStatus>
                      Активно
                    </CellStatus>
                  </TableCell>
                  <TableCell>
                    <HideButton>
                      <img src={hide} alt="hide icon" width={24} height={17} />
                    </HideButton>
                    <DeleteButton>
                      <img src={del} alt="del icon" width={14} height={16} />
                    </DeleteButton>
                  </TableCell>
                </tr>
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
    width: 94px;
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
`;
const TableCell = styled.td`
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
  padding: 15px 0;
`;

const CellInviteLink = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: #D6DCEC;
  }
  span {
    color: #336CFF;
    font-size: 12px;
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
CellStatus
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
