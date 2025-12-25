import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"
import { useChannelMembers } from "@/lib/channels/my-team/useChannelMembers";
import del from "@/assets/del.svg";
import ModernLoading from "@/components/ModernLoading";

const MyTeamPopup = () => {
  const { popup, changeContent } = usePopupStore();
  const channelName = popup?.data?.channelName;
  const { members, membersLoading } = useChannelMembers(channelName);

  return (
    <MyTeamContainer>
      <BtnBase
        $color="#5ABAFF"
        $bg="#1B283C"
        onClick={() => changeContent("my_team_add")}
      >
        Пригласить в команду
      </BtnBase>
      <TableWrapper>
        {!membersLoading && channelName ? (
          members?.team?.length > 0 ? (
          //   <Table>
          //     <colgroup>
          //       <col />
          //       <col />
          //       <col />
          //       <col />
          //     </colgroup>
          //     <thead>
          //       <tr>
          //         <HeaderCell>Имя</HeaderCell>
          //         <HeaderCell>Роль</HeaderCell>
          //         <HeaderCell>Дата вступления</HeaderCell>
          //         <HeaderCell />
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {members?.team?.map((member, index) => (
          //         <TableItem key={index}>
          //           <TableCell>
          //             <TableCellName>
          //               <img src={member.user.avatarUrl} alt="avatar" />
          //               <NameBlock>
          //                 <p>
          //                   {member.user.firstName} {member.user.lastName.charAt()}.
          //                 </p>
          //                 {/* {member.username && (
          //                 <span>@{member.username}</span>
          //               )} */}
          //               </NameBlock>
          //             </TableCellName>
          //           </TableCell>
          //           <TableCell>{member.role}</TableCell>
          //           <TableCell>
          //             {/* {new Date(member.createdAt).toLocaleDateString()} */}
          //           </TableCell>
          //           <TableCell>
          //             <ButtonDel title="Удалить">
          //               <img src={del} alt="del icon" width={14} height={16} />
          //             </ButtonDel>
          //           </TableCell>
          //         </TableItem>
          //       ))}
          //     </tbody>
          //   </Table>
            <ModernLoading  text="Загрузка команды..."/>
          ) : (
            <p>В команде пока нет участников</p>
          )
        ) : (
          <ModernLoading text="Загрузка команды..."/>
        )}
      </TableWrapper>
    </MyTeamContainer>
  );
};

const MyTeamContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const TableWrapper = styled.div`

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
  
  img {
    margin: 0 24px 0 0;
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

export default MyTeamPopup;