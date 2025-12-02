import styled from "styled-components";
import dir_filled from "@/assets/TableGroups/dir-filled.svg";
import dir from "@/assets/TableGroups/dir.svg";
import dir_active from "@/assets/TableGroups/dir-active.svg";
import show_card from "@/assets/TableGroups/show-card.svg";
import show_table from "@/assets/TableGroups/show-table.svg";
const TableGroups = () => {
  return (
    <TableGroupsContainer>
      <TableGroupsHead>
        <TableGroupsHeadLeft>
            <TableGroupsHeadDir><img src={dir_filled} alt="dir icon" />Создать папку</TableGroupsHeadDir>
            <TableGroupsHeadBtn><img src={dir} alt="dir icon" />Основная папка <mark>6</mark></TableGroupsHeadBtn>
            <TableGroupsHeadBtn><img src={dir_active} alt="dir icon" />Олимпиада 2027 <mark>16</mark></TableGroupsHeadBtn>
        </TableGroupsHeadLeft>
        <TableGroupsHeadRight>
            <TableGroupsHeadAdd>+ Добавить канал</TableGroupsHeadAdd>
            <TableGroupsHeadShow><img src={show_card} alt="show icon"/></TableGroupsHeadShow>
            <TableGroupsHeadShow><img src={show_table} alt="show icon"/></TableGroupsHeadShow>
        </TableGroupsHeadRight>
      </TableGroupsHead>
    </TableGroupsContainer>
  )
}
const TableGroupsContainer = styled.section`
    margin-top: 80px;
    padding: 0 24px;
`
const TableGroupsHead = styled.div`
    display: flex;
    justify-content: space-between;
`
const TableGroupsHeadLeft = styled.div`
    display: flex;
    gap: 40px;
`
const TableGroupsHeadDir = styled.button`
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: #151F37;
    color: #336CFF;
    padding: 18px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
`
const TableGroupsHeadBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 2px solid #1F273B;
    color: #6A7080;
    padding-bottom: 18px;
    font-size: 14px;
    font-weight: 600;
    mark {
        color: #6A7080;
        background-color: transparent;
    }
`
const TableGroupsHeadRight = styled.div`
    display: flex;
    gap: 8px;
`

const TableGroupsHeadAdd = styled.button`
    background-color: #336CFF;
    color: #fff;
    padding: 18px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    margin-right: 16px;
`
const TableGroupsHeadShow = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #1F273B;
    width: 48px;
    height: 48px;
    border-radius: 12px;
`

export default TableGroups