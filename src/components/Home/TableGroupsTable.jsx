import styled from 'styled-components';
import ava_groups from "@/assets/TableGroups/ava-groups.png";
import dir_white from "@/assets/TableGroups/dir-white.svg";
import del from "@/assets/TableGroups/del.svg";
import setting from "@/assets/setting.svg";

const TableGroupsTable = () => {
    const tableData = [
        { id: 1, number: '#1', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: true },
        { id: 2, number: '#2', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: false },
        { id: 3, number: '#3', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: true },
        { id: 4, number: '#4', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: true },
        { id: 5, number: '#5', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: false },
        { id: 6, number: '#6', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: true },
        { id: 7, number: '#7', image: ava_groups, name: 'Для наших ребят', status: 'Премодерация постов', online: true },
    ];

    return (
        <TableContainer>
            <TableWrapper>
                <Table>
                    <colgroup>
                        <col style={{ width: "35%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "calc(35% - 200px)" }} />
                        <col style={{ width: "200px" }} />
                    </colgroup>
                    <TableHead>
                        <tr>
                            <HeaderCell>Название группы</HeaderCell>
                            <HeaderCell>Список</HeaderCell>
                            <HeaderCell>Статус</HeaderCell>
                            <HeaderCell>Параметры</HeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableItem key={row.id}>
                                <TableCell>
                                    <p>
                                        {row.number}
                                        <img src={row.image} alt="Group" />
                                        {row.name}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <TableCellStatus>{row.status}</TableCellStatus>
                                </TableCell>
                                <TableCell>
                                    <TableCellOnline $online={row.online}>
                                        <StatusIndicator $online={row.online} />
                                        {row.online ? 'Онлайн' : 'Ошибка'}
                                    </TableCellOnline>
                                </TableCell>
                                <TableCell>
                                    <ButtonsWrap>
                                        <ButtonDir title="Перейти"><img src={dir_white} alt="" width={16} height={13} /></ButtonDir>
                                        <ButtonSetting title="Настройки"><img src={setting} alt="" width={16} height={16} /></ButtonSetting>
                                        <ButtonDel title="Удалить"><img src={del} alt="" width={14} height={16} /></ButtonDel>
                                    </ButtonsWrap>
                                </TableCell>
                            </TableItem>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        </TableContainer>
    );
};

export default TableGroupsTable;

const TableContainer = styled.div`
    margin-top: 20px;
`;

const TableWrapper = styled.div`
    position: relative;
    width: 100%;
    max-height: calc(100vh - 800px); 
    min-height: 400px;
    overflow-y: auto;
    scrollbar-width: none;
    &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: 100%;
        background: linear-gradient(to top, #131826, #13182600);
        backdrop-filter: blur(8px);
        mask-image: linear-gradient(to top, black 50%, transparent);
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 20px;
    table-layout: fixed;
`;

const TableHead = styled.thead`
    th:first-child {
        padding-left: 24px;
    }
    th:last-child {
        padding-right: 24px;
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
    background-color: #131826;
`;

const TableBody = styled.tbody``;

const TableItem = styled.tr`
    transition: background .15s ease;
    td {
        padding: 15px 0;
    }

    td:first-child {
        border-radius: 24px 0 0 24px;
        padding-left: 24px;
    }

    td:last-child {
        border-radius: 0 24px 24px 0;
        padding-right: 24px;
    }

    &:hover {
        background-color: #1C2438;
    }
`;

const TableCell = styled.td`
    font-size: 14px;
    p {
        display: flex;
        align-items: center;
        font-weight: 700;
        margin: 0;
        
        img {
            margin: 0 24px 0 32px;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            object-fit: cover;
        }
    }
`;

const TableCellStatus = styled.button`
    padding: 18px 24px;
    border-radius: 12px;
    color: #6A7080;
    border: 2px solid #1F273B;
    font-size: 14px;
    font-weight: 700;
    background: transparent;
    &:hover {
        background-color: #336CFF;
        color: #fff;
    }
`;

const TableCellOnline = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.$online ? '#D6DCEC' : '#EF6284'};
`;

const StatusIndicator = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.$online ? '#B5EC5B' : '#EF6284'};
    margin-right: 16px;
`;

const ButtonsWrap = styled.div`
    display: flex;
    align-items: center;
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
const ButtonDir = styled(BaseButton)`
  border: 2px solid #336CFF;
  margin-right: 8px;

  &:hover {
    background-color: #336CFF;
  }
`;

const ButtonSetting = styled(BaseButton)`
  border: 2px solid #2F3953;
  margin-right: 24px;
`;

const ButtonDel = styled(BaseButton)`
  border: 2px solid #2F3953;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`;
