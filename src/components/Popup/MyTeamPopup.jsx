import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"
import { myTeamDatas } from "@/data/myTeamDatas";
import del from "@/assets/del.svg";

const MyTeamPopup = () => {
  const { changeContent } = usePopupStore()
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
              <HeaderCell></HeaderCell>
            </tr>
          </thead>
          <tbody>
            {myTeamDatas.map((row) => (
              <TableItem key={row.id}>
                <TableCell>
                  <TableCellName>
                    <img src={row.ava} alt="Group" />
                    <span>{row.name}</span>
                  </TableCellName>
                </TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.data}</TableCell>
                <TableCell>
                  <ButtonDel title="Удалить"><img src={del} alt="del icon" width={14} height={16} /></ButtonDel>
                </TableCell>
              </TableItem>
            ))}
          </tbody>
        </Table>
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
`;
const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  & colgroup col:first-child {
    width: 25%;
  }
  & colgroup col:nth-child(2) {
    width: 25%;
  }
  & colgroup col:nth-child(3) {
    width: calc(50% - 48px);
  }
  & colgroup col:nth-child(4) {
    width: 48px;
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