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
    ];

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <tr>
                        <HeaderCell style={{ width: "350px" }}>Название группы</HeaderCell>
                        <HeaderCell style={{ width: "350px" }}>Список</HeaderCell>
                        <HeaderCell style={{ width: "260px" }}>Статус</HeaderCell>
                        <HeaderCell>Параметры</HeaderCell>
                    </tr>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableItem key={row.id}>
                            <TableCell style={{ width: "350px" }}>
                                <p>{row.number} <img src={row.image} alt="image Groups" /> {row.name}</p>
                            </TableCell>
                            <TableCell style={{ width: "350px" }}>
                                <TableCellStatus>{row.status}</TableCellStatus>
                            </TableCell>
                            <TableCell style={{ width: "260px" }}>
                                <TableCellOnline $online={row.online}>
                                    <StatusIndicator $online={row.online}/>
                                    {row.online ? 'Онлайн' : 'Ошибка'}
                                </TableCellOnline>
                            </TableCell>
                            <TableCell style={{ width: "200px" }}>
                                <ButtonDir><img src={dir_white} alt="dir icon" width={16} height={13}/></ButtonDir>
                                <ButtonSetting><img src={setting} alt="setting icon" width={16} height={16}/></ButtonSetting>
                                <ButtonDel><img src={del} alt="del icon" width={14} height={16}/></ButtonDel>
                            </TableCell>
                        </TableItem>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const TableContainer = styled.div`
    margin-top: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 0 30px;
    display: flex;
    flex-direction: column;
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
`;
const TableBody = styled.tbody`
    box-sizing: border-box;
    max-height: 306px;
    overflow-y: auto;
    scrollbar-width: none;
    padding-bottom: 80px;
`;

const TableItem = styled.tr`
    td {
        padding: 15px 0;
    }
    td:first-child {
        border-radius: 8px 0 0 8px; 
        padding-left: 24px;
    }
    td:last-child {
        border-radius: 0 8px 8px 0 ;
        padding-right: 24px;
    }

    &:hover {
        background-color: #1C2438;
        border-radius: 24px;
    }
`
const TableCell = styled.td`
    font-size: 14px;

    p {
        display: flex;
        align-items: center;
        font-weight: 700;

        img {
            margin: 0 24px 0 32px;
            width: 40px;
            height: 40px;
            border-radius: 12px;
        }
}
`;
const TableCellStatus = styled.button`
    padding: 16px 24px;
    border-radius: 12px;
    color: #6A7080;
    border: 2px solid #1F273B;
    font-size: 14px;
    font-weight: 700;
`;

const TableCellOnline = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.$online ? '#D6DCEC' : '#EF6284'};
`;
const StatusIndicator = styled.span`
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${props => props.$online ? '#B5EC5B' : '#EF6284'};
    margin-right: 16px;
`;
const ButtonDir = styled.button`
    background-color: #336CFF;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-right: 8px;
`;
const ButtonSetting = styled.button`
    border: 2px solid #2F3953;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-right: 24px;
`;
const ButtonDel = styled.button`
    background-color: #EF628414;
    width: 48px;
    height: 48px;
    border-radius: 12px;
`;
export default TableGroupsTable;