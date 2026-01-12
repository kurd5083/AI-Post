import { useState, useMemo } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import ModernLoading from "@/components/ModernLoading";
import AvaPlug from "@/shared/AvaPlug";
import CustomSelect from "@/shared/CustomSelect";
import del from "@/assets/del.svg";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

import { useChannelMembers } from "@/lib/channels/my-team/useChannelMembers";
import { useChannelRoles } from "@/lib/channels/my-team/useChannelRoles";
import { useRemoveChannelMember } from "@/lib/channels/my-team/useRemoveChannelMember";
import { useUpdateChannelMemberRole } from "@/lib/channels/my-team/useUpdateChannelMemberRole";

const MyTeamPopup = () => {
  const { popup, changeContent } = usePopupStore();
  const { addNotification } = useNotificationStore();

  const channelId = popup?.data?.channelId;
  const telegramId = popup?.data?.telegramId;

  const { members, membersLoading } = useChannelMembers(channelId);
  const { channelRoles } = useChannelRoles();
  const { mutate: removeMember, isPending: removingPending } = useRemoveChannelMember();
  const { mutate: mutateRole, isPending: updatingRole } = useUpdateChannelMemberRole();

  const [errorAvatars, setErrorAvatars] = useState([]);

  const self = useMemo(
    () => members?.team?.find((m) => m.user.telegramId === telegramId),
    [members, telegramId]
  );
  const myRole = self?.role;

  const roleOptions = useMemo(
    () => channelRoles?.map((r) => ({ value: r.role, label: r.name })) || [],
    [channelRoles]
  );

  const canEditRoles = (targetRole) => {
    if (!myRole) return false;
    if (myRole === "OWNER") return true;
    if (myRole === "ADMIN") return ["MEMBER", "EDITOR"].includes(targetRole);
    return false;
  };

  const canRemove = (targetRole) => {
    if (!myRole) return false;
    if (myRole === "OWNER") return targetRole !== "OWNER";
    if (myRole === "ADMIN") return ["MEMBER", "EDITOR"].includes(targetRole);
    return false;
  };
  const handleRemove = (memberTelegramId) => {
    removeMember(
      { channelId, memberTelegramId },
      {
        onSuccess: (data) => addNotification(data?.message, "success"),
        onError: (err) =>
          addNotification(err?.message || "Ошибка при удалении участника", "error"),
      }
    );
  };

  const handleChangeRole = (member, newRole) => {
    mutateRole(
      { channelId, memberTelegramId: member.user.telegramId, role: newRole },
      {
        onSuccess: (data) =>
          addNotification(data.message || "Роль успешно изменена", "success"),
        onError: (error) =>
          addNotification(
            error?.response?.data?.message || "Ошибка при изменении роли",
            "error"
          ),
      }
    );
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
                            <span>{new Date(member.createdAt).toLocaleDateString("ru-RU", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            })}</span>
                          </NameBlock>
                        </TableCellName>
                      </TableCell>
                      <TableCell>
                        {canEditRoles(member.role) && member.role !== "OWNER" ? (
                          <CustomSelect
                            options={roleOptions}
                            value={member.role}
                            onChange={(opt) => handleChangeRole(member, opt.value)}
                            placeholder="Выберите роль"
                            padding={false}
                            border={false}
                            disabled={updatingRole}
                            width="fit-content"
                          />
                        ) : (
                          channelRoles?.find(r => r.role === member.role)?.name || member.role
                        )}
                      </TableCell>
                      <TableCell>
                        <p>{new Date(member.createdAt).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}</p>
                      </TableCell>
                      <TableCell>
                        {canRemove(member.role) && (
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
    width: 30%;
    @media (max-width: 768px) {
      width: calc(50% - 24px);
    }
  }
  & colgroup col:nth-child(2) {
    width: 30%;
    @media (max-width: 768px) {
      width: calc(50% - 24px);
    }
  }
  & colgroup col:nth-child(3) {
    width: calc(40% - 48px);
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
  text-align: left;
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
  text-align: left;
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
   @media (max-width: 480px) {
      gap: 10px;
    }
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