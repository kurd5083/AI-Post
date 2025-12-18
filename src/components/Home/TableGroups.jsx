import styled from 'styled-components';
import dir_white from "@/assets/table-groups/dir-white.svg";
import del from "@/assets/del.svg";
import setting from "@/assets/setting.svg";
import list from "@/assets/table-groups/list.svg";
import { usePopupStore } from "@/store/popupStore"
import { useChannelsStore } from "@/store/channelsStore";
import { useDeleteChannel } from "@/lib/useDeleteChannel";
import useResolution from "@/lib/useResolution";


const TableGroups = () => {
  const { openPopup } = usePopupStore();
  const { isSmall } = useResolution();
  const { selectedChannels } = useChannelsStore();
  const { mutate: deleteChannel } = useDeleteChannel();

  return (
    <Table>
      <colgroup>
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <TableHead>
        <tr>
          <HeaderCell>Название группы</HeaderCell>
          <HeaderCell>Список</HeaderCell>
          <HeaderCell>Статус</HeaderCell>
          <HeaderCell>Параметры</HeaderCell>
        </tr>
      </TableHead>
      <tbody>
        {selectedChannels && selectedChannels.length > 0 ? (
          selectedChannels.map((channel, index) => (
            <TableItem key={channel.id}>
              <TableCell>
                <p>
                  <TableCellNum>#{index++}</TableCellNum>
                  <img src={channel.avatarUrl} alt="Group" />
                  <span>{channel.name}</span>
                </p>
              </TableCell>
              <TableCell>
                <TableCellStatus>{isSmall ? 'Премодерация' : 'Премодерация постов'}</TableCellStatus>
              </TableCell>
              <TableCell>
                {/* <TableCellOnline $online={channel.online}>
                <StatusIndicator $online={channel.online} />
                {channel.online ? 'Онлайн' : 'Ошибка'}
              </TableCellOnline> */}
              </TableCell>
              <TableCell>
                <ButtonsWrap>
                  <ButtonList title="Список"><img src={list} alt="list icon" width={16} height={16} /></ButtonList>
                  <ButtonDir onClick={() => openPopup("move_channel", "popup_window")} title="Перейти"><img src={dir_white} alt="dir icon" width={16} height={13} /></ButtonDir>
                  <ButtonSetting onClick={() => openPopup()} title="Настройки"><img src={setting} alt="setting icon" width={16} height={16} /></ButtonSetting>
                  <ButtonDel onClick={() => deleteChannel(channel.id)} title="Удалить"><img src={del} alt="del icon" width={14} height={16} /></ButtonDel>
                </ButtonsWrap>
              </TableCell>
            </TableItem>
          ))
        ) : (
          <TableItem>
            <NoChannels colSpan={4}>Каналы отсутствуют</NoChannels>
          </TableItem>
        )}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  table-layout: fixed;

	@media(max-width: 768px) {
		border-spacing: 0;
  }

  & colgroup col:first-child {
    width: 35%;
    @media(max-width: 991px) {
      width: 32%;
    }
		@media(max-width: 768px) {
			width: calc(100% - 238px);
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
			width: 238px;
  	}
    @media(max-width: 480px) {
			width: 195px;
  	}
  }
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
      padding-left: 24px;
    }
    th:last-child {
      padding-right: 24px;
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
			padding-left: 24px;
		}
		@media(max-width: 480px) {
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
const TableCellNum = styled.span`
  @media(max-width: 991px) {
    display: none;
  }
`;

const TableCellStatus = styled.button`
  padding: 18px 24px;
  border-radius: 12px;
  color: #6A7080;
  border: 2px solid #2A344C;
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
	margin-right: 8px;
	@media (max-width: 480px) {
    margin-right: 4px !important;
		width: 40px;
  	height: 40px;
  }
`;
const ButtonDir = styled(BaseButton)`
  border: 2px solid #336CFF;
  
  &:hover {
    background-color: #336CFF;
  }
`;

const ButtonList = styled(BaseButton)`
  display: none;
	border: 2px solid #2F3953;

	@media (max-width: 768px) {
    display: flex;
  }
`;
const ButtonSetting = styled(BaseButton)`
  border: 2px solid #2F3953;
  margin-right: 24px;
  @media (max-width: 991px) {
    flex-direction: row;
    margin-right: 8px;
  }
`;
const ButtonDel = styled(BaseButton)`
  border: 2px solid #2F3953;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`;
const NoChannels = styled.td`
  border-radius: 24px !important;
  text-align: center;
  color: #6A7080;
  padding: 40px 0 !important;
  font-weight: 600;
  background-color: #1C2438;
`;

export default TableGroups;
