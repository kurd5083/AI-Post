import { useState, useEffect } from 'react';
import styled from 'styled-components';

import setting from "@/assets/setting.svg";
import list from "@/assets/table-groups/list.svg";
import DirIcon from '@/icons/DirIcon';
import DelIcon from "@/icons/DelIcon";

import СhannelPlug from '@/shared/СhannelPlug';

import { useChannelsGroupedByFolders } from "@/lib/useChannelsGroupedByFolders";
import { useDeleteChannel } from "@/lib/channels/useDeleteChannel";
import useResolution from "@/hooks/useResolution";

import { getPendingModerationCount } from '@/api/channels/getPendingModerationCount';

import { usePopupStore } from "@/store/popupStore"
import { useChannelsStore } from "@/store/channelsStore";

const TableGroups = () => {
  const { openPopup } = usePopupStore();
  const { isSmall } = useResolution();
  const { selectedId } = useChannelsStore();
  const { channels, channelsPending } = useChannelsGroupedByFolders();
  const { mutate: deleteChannel } = useDeleteChannel();
  const [pendingCounts, setPendingCounts] = useState({});
  console.log(channels) 
  useEffect(() => {
    if (!channels) return;

    const allChannels = [
      ...(channels.channelsWithoutFolder || []),
      ...channels.folders?.flatMap(folder => folder.channels) || []
    ];

    allChannels.forEach(async (channel) => {
      try {
        const data = await getPendingModerationCount(channel.id);
        setPendingCounts(prev => ({ ...prev, [channel.id]: data.count || 0 }));
      } catch (err) {
        console.error(err);
      }
    });
  }, [channels]);

  if (channelsPending) {
    return (
      <NoChannelsContainer>
        <NoChannels>Загрузка каналов...</NoChannels>
      </NoChannelsContainer>
    );
  }

  const selectedFolder =
    selectedId === null
      ? null
      : channels?.folders?.find(folder => folder.id === selectedId);

  const currentChannels =
    selectedId === null
      ? channels?.channelsWithoutFolder || []
      : selectedFolder?.channels || [];

  const emptyMessage =
    selectedId === null
      ? "Каналы отсутствуют"
      : selectedFolder
        ? `В папке "${selectedFolder.name}" нет каналов`
        : "Папка не найдена";

  if (!currentChannels.length) {
    return (
      <NoChannelsContainer>
        <NoChannels>{emptyMessage}</NoChannels>
      </NoChannelsContainer>
    );
  }

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
        {currentChannels.map((channel, index) => (
          <TableItem key={channel.id}>
            <TableCell>
              <p>
                <TableCellNum>#{index + 1}</TableCellNum>
                <TableCellAva>
                  <СhannelPlug width="40px" height="40px" text={channel.name} />
                </TableCellAva>
                <CellName>{channel.name}</CellName>
              </p>
            </TableCell>
            <TableCell>
              {channel?.workMode === "PREMODERATION" ? (
                <TableCellStatus onClick={() => openPopup("premoderation", "popup", { channelId: channel.id, filter: "premoderation" })}>
                  <Status>
                    {pendingCounts[channel.id] || 0}
                  </Status>
                  {isSmall ? 'Премодерация' : 'Премодерация постов'}
                </TableCellStatus>
              ) : (
                <TableCellStatus onClick={() => openPopup("calendar", "popup", { channelId: channel.id })}>
                  Календарь
                </TableCellStatus>
              )}
            </TableCell>
            <TableCell >
              <p>
                {channel?.workMode === "PREMODERATION" && "Предмодерация"}
                {channel?.workMode === "AUTOPOSTING" && "Автопостинг"}
              </p>
            </TableCell>
            <TableCell>
              <ButtonsWrap>
                <ButtonList title="Список"><img src={list} alt="list icon" width={16} height={16} /></ButtonList>
                <ButtonDir onClick={() => openPopup("move_channel", "popup_window", { channelId: channel.id })} title="Перейти">
                  <DirIcon />
                </ButtonDir>
                <ButtonSetting onClick={() => openPopup('settings', 'popup', { channelId: channel.id, channelName: channel.channelId })} title="Настройки"><img src={setting} alt="setting icon" width={16} height={16} /></ButtonSetting>
                <ButtonDel
                  onClick={(e) => {
                    e.stopPropagation();
                    openPopup("delete_confirm", "popup_window", {
                      itemName: channel.name,
                      onDelete: () => deleteChannel(channel.id),
                    });
                  }}
                  title="Удалить"
                >
                  <DelIcon />
                </ButtonDel>
              </ButtonsWrap>
            </TableCell>
          </TableItem>
        ))}
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
  transition: background 0.15s ease, transform 0.15s ease;
  &:hover svg {
    transform: scale(1.08);
  }

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
    transform: translateY(-2px);
  }
`;

const TableCell = styled.td`
  font-size: 14px;
  p {
    display: flex;
    align-items: center;
    font-weight: 700;
    margin: 0;
  }
	@media(max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;
const CellName = styled.span`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const TableCellNum = styled.span`
  @media(max-width: 991px) {
    display: none;
  }
`;
const TableCellAva = styled.div`
  margin: 0 24px 0 32px;

  @media(max-width: 991px) {
    margin: 0 10px 0 0;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    object-fit: cover;
    transition: transform 0.2s ease;
  }
`;
const TableCellStatus = styled.button`
  position: relative;
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
    border: 2px solid #336CFF;
  }
`;
const Status = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  transform: translate(60%, -50%);
  right: 0;
  top: 50%;
  color: #336CFF;
  background-color: #1F305C;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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
  &:hover {
    transform: scale(1.1);       
  }
	@media (max-width: 480px) {
    margin-right: 4px !important;
		width: 40px;
  	height: 40px;
  }
`;
const ButtonDir = styled(BaseButton)`
  border: 2px solid #2F3953;
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
const NoChannelsContainer = styled.div`
  padding: 0 24px;
  @media (max-width: 1600px) {
    padding: 0;
  }

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;
const NoChannels = styled.p`
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
`;

export default TableGroups;
