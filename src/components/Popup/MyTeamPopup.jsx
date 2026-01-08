import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"
import { useChannelMembers } from "@/lib/channels/my-team/useChannelMembers";
import del from "@/assets/del.svg";
import ModernLoading from "@/components/ModernLoading";
import AvaPlug from "@/shared/AvaPlug";
import { useRemoveChannelMember } from "@/lib/channels/my-team/useRemoveChannelMember";

const MyTeamPopup = () => {
  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { members, membersLoading } = useChannelMembers(channelId);
  const [errorAvatars, setErrorAvatars] = useState([]);

  const { mutate: removeMember, isPending: removingPending } = useRemoveChannelMember();

  const handleRemove = (telegramId) => {
    removeMember({ channelId, memberTelegramId: telegramId });
  };

  return (
    <MyTeamContainer>
      <BtnBase
        $color="#5ABAFF"
        $bg="#1B283C"
        onClick={() => changeContent("my_team_add", 'popup', { channelId })}
      >
        Пригласить в команду
      </BtnBase>
      <TableWrapper>
        {!membersLoading && channelId ? (
          members?.team?.length > 0 ? (
            <Table>
              <colgroup>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <HeaderCell>Имя</HeaderCell>
                  <HeaderCell>Роль</HeaderCell>
                  <HeaderCell>Дата вступления</HeaderCell>
                  <HeaderCell />
                </tr>
              </thead>
              <tbody>
                {members?.team?.map((member) => {
                  console.log(errorAvatars)
                  const isError = errorAvatars.includes(member.user.telegramId);

                  return (
                    <TableItem key={member.user.telegramId}>
                      <TableCell>
                        <TableCellName>
                          {member.user.avatarUrl && !isError ? (
                            <img
                              src={member.user.avatarUrl}
                              alt="avatar"
                              onError={() =>
                                setErrorAvatars((prev) => [
                                  ...prev,
                                  member.user.telegramId,
                                ])
                              }
                            />
                          ) : (
                            <AvaPlug width="48px" height="48px" />
                          )}

                          <NameBlock>
                            <p>
                              {member.user.firstName}{" "}
                              {member.user.lastName
                                ? member.user.lastName.charAt(0) + "."
                                : ""}
                            </p>
                            {member.username && <span>@{member.username}</span>}
                          </NameBlock>
                        </TableCellName>
                      </TableCell>

                      <TableCell>
                        {member.role === "OWNER"
                          ? "Владелец"
                          : member.role === "MEMBER"
                            ? "Участник"
                            : member.role}
                      </TableCell>

                      <TableCell>
                        {/* {new Date(member.createdAt).toLocaleDateString()} */}
                      </TableCell>

                      <TableCell>
                        {member.role !== "OWNER" && (
                          <ButtonDel
                            title="Удалить"
                            onClick={(e) => {
                              e.stopPropagation();
                              changeContent("delete_confirm", "popup_window", {
                                itemName: member.user.firstName,
                                onDelete: () => handleRemove(member.user.telegramId),
                              });
                            }}
                            disabled={removingPending}
                          >
                            <img src={del} alt="del icon" width={14} height={16} />
                          </ButtonDel>
                        )}
                      </TableCell>
                    </TableItem>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <EmptyTeam>В команде пока нет участников</EmptyTeam>
          )
        ) : (
          <ModernLoading text="Загрузка команды..." />
        )}
      </TableWrapper>
    </MyTeamContainer>
  );
};

const MyTeamContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`;
const TableWrapper = styled.div`
  height: 100%;
  margin-top: 48px;
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
const TableCellName = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  img {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    object-fit: cover;
  }
`;
const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  span {
    display: none;
    color: #6A7080;
    @media (max-width: 768px) {
      display: block;
    }
  }
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
const EmptyTeam = styled.p`
  box-sizing: border-box;
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
`
export default MyTeamPopup;