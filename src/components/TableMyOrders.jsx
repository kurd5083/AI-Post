import styled from 'styled-components';
import del from "@/assets/del.svg";
import { tablemyordersdata } from "@/data/tablemyordersdata";
import useResolution from "@/lib/useResolution";

const TableMyOrders = () => {
  const { isSmall } = useResolution();

  return (
    <TableContainer>
      <TableWrapper>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <TableHead>
            <tr>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Название</HeaderCell>
              <HeaderCell>Дата</HeaderCell>
              <HeaderCell>Ссылка</HeaderCell>
              <HeaderCell>Сумма</HeaderCell>
              <HeaderCell>Стартовое число</HeaderCell>
              <HeaderCell>Кол-во</HeaderCell>
              <HeaderCell>Статус</HeaderCell>
              <HeaderCell>Осталось</HeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {tablemyordersdata.map((row) => (
              <TableItem key={row.id}>
                <TableCell>
                  <TableCellNum>{row.number}</TableCellNum>
                </TableCell>
                <TableCell>
                  <TableCellName>
                    <img src={row.image} alt="Group" />
                    <span>{row.name}</span>
                  </TableCellName>
                </TableCell>
                <TableCell>{row.data}</TableCell>

                <TableCell>
                  <TableCellLink href={row.link || "tg.me/owadawd"} target="_blank">
                    {isSmall ? row.link?.split('/').pop() || "tg.me/..." : row.link || "tg.me/owadawd"}
                  </TableCellLink>
                </TableCell>

                <TableCell>
                  <TableCellAmount>{row.amount}</TableCellAmount>
                </TableCell>

                <TableCell>
                  <TableCellStarting>{row.starting}</TableCellStarting>
                </TableCell>

                <TableCell>
                  <TableCellQuantity>{row.quantity}</TableCellQuantity>
                </TableCell>

                <TableCell>
                  <TableCellOnline $online={row.online}>
                    <StatusIndicator $online={row.online} />
                    {row.online ? 'Онлайн' : 'Ошибка'}
                  </TableCellOnline>
                </TableCell>

                <TableCell>
                  <TableCellRemained>
                    {row.remained}
                  </TableCellRemained>
                </TableCell>

                <TableCell>
                  <ButtonDel title="Удалить"><img src={del} alt="del icon" width={14} height={16} /></ButtonDel>
                </TableCell>
              </TableItem>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};


const TableContainer = styled.div`
  position: relative;
  margin-top: 20px;
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
    @media (max-width: 768px) {
    padding: 0;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: calc(100svh - 600px); 
  min-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  table-layout: fixed;

    @media(max-width: 768px) {
        border-spacing: 0;
  }

  /* & colgroup col:first-child {
    width: 35%;
    @media(max-width: 991px) {
      width: 32%;
    }
        @media(max-width: 768px) {
            width: calc(100% - 250px);
    }
        @media(max-width: 480px) {
            width: calc(100% - 195px);
    }
  }
  & colgroup col:nth-child(2) {
    width: 30%;
    @media(max-width: 1600px) {
      width: 25%;
    }
         @media(max-width: 991px) {
      width: 27%;
    }
        @media(max-width: 768px) {
            display: none;
    }
  }
  & colgroup col:nth-child(3) {
    width: calc(35% - 200px);
    @media(max-width: 1600px) {
      width: calc(40% - 185px);
    }
        @media(max-width: 991px) {
      width: calc(40% - 170px);
    }
        @media(max-width: 768px) {
            display: none;
    }
  }
  & colgroup col:last-child {
    width: 200px;
    @media(max-width: 1600px) {
      width: 185px;
    }
    @media(max-width: 991px) {
      width: 170px;
    }
        @media(max-width: 768px) {
            width: 250px;
    }
        @media(max-width: 480px) {
            width: 195px;
    }
  } */
`;

const TableHead = styled.thead`
  th:first-child {
    padding-left: 24px;
  }
  th:last-child {
    padding-right: 24px;
  }
  @media(max-width: 1600px) {
    th:first-child {
      padding-left: 0px;
    }
    th:last-child {
      padding-right: 0px;
    }
  }
    @media(max-width: 768px) {
    th:first-child {
      padding-left: 32px;
    }
    th:last-child {
      padding-right: 32px;
    }
  }

    @media(max-width: 480px) {
        display: none;
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
  @media(max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;

const TableBody = styled.tbody``;

const TableItem = styled.tr`
  transition: background .15s ease;
  
  @media(max-width: 768px) {
        &:last-child {
      td {
        border-bottom: 0;
      }
    }
    }
  
  td {
    padding: 15px 0;
        @media(max-width: 768px) {
            border-bottom: 2px solid #1F273B;
            border-radius: 0 !important; 
            padding: 30px 0;
      
        }
  }
        
  td:first-child {
    border-radius: 24px 0 0 24px;
    padding-left: 24px;
    padding-right: 10px;
   @media(max-width: 1600px) {
      padding-left: 8px;
    }
        @media(max-width: 768px) {
            padding-left: 32px;
        }
        @media(max-width: 480px) {
            padding-left: 24px;
            span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
  }

  td:last-child {
    border-radius: 0 24px 24px 0;
    padding-right: 24px;
    @media(max-width: 1600px) {
      padding-right: 8px;
    }
    @media(max-width: 768px) {
        padding-right: 32px;
    }
    @media(max-width: 480px) {
        padding-right: 24px;
    }
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
      @media(max-width: 991px) {
        margin: 0 10px 0 0;
      }
    }
  }
    @media(max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;
const TableCellName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: 0;
  
  img {
    margin: 0 24px 0 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    object-fit: cover;
    
    @media(max-width: 991px) {
      margin: 0 10px 0 0;
    }
  }
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media(max-width: 480px) {
      max-width: 100px;
    }
  }
`;
const TableCellNum = styled.span`
  @media(max-width: 991px) {
    display: none;
  }
`;


const TableCellLink = styled.a`
  color: #336CFF;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TableCellAmount = styled.div`
`;

const TableCellStarting = styled.div`
`;

const TableCellQuantity = styled.div`
`;

const TableCellRemained = styled.div`
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

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
  margin-right: 8px;
  @media (max-width: 480px) {
    margin-right: 4px !important;
    width: 40px;
    height: 40px;
  }
`;

const ButtonDel = styled(BaseButton)`
  border: 2px solid #2F3953;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`;
export default TableMyOrders;
