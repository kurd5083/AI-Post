import styled from 'styled-components';
import dir_white from "@/assets/table-groups/dir-white.svg";
import del from "@/assets/del.svg";
import setting from "@/assets/setting.svg";
import { usePopupStore } from "@/store/popupStore"
import { useChannelsStore } from "@/store/channelsStore";
import { useDeleteChannel } from "@/lib/useDeleteChannel";
import { useChannelsGroupedByFolders } from "@/lib/useChannelsGroupedByFolders";

const GridGroups = () => {
  const { openPopup } = usePopupStore();
  const { selectedId } = useChannelsStore();
  const { channels } = useChannelsGroupedByFolders();
  const { mutate: deleteChannel } = useDeleteChannel();
  console.log(channels)
  
  return (
    <GridContainer>
      {(() => {
        let currentChannels = [];
        let isEmpty = true;

        if (selectedId === null) {
          currentChannels = channels?.channelsWithoutFolder || [];
          isEmpty = currentChannels.length === 0;
        } else {
          const selectedFolder = channels?.folders?.find(folder => folder.id == selectedId);
          currentChannels = selectedFolder?.channels || [];
          isEmpty = currentChannels.length === 0;
        }

        if (isEmpty) {
          return (
            <GridItem>
              <NoChannels colSpan={4}>Каналы отсутствуют</NoChannels>
            </GridItem>
          );
        }
        return currentChannels.map((channel, index) => (
          <GridItem key={channel.id}>
            <GridItemNum>#{index++}</GridItemNum>
            <GridImg src={channel.avatarUrl} alt="Group" />
            <span>{channel.name}</span>
            {/* <GridOnline $online={channel.online}>
              <StatusIndicator $online={channel.online} />
              {channel.online ? 'Онлайн' : 'Ошибка'}
            </GridOnline> */}
            <GridStatus>Премодерация</GridStatus>
            <ButtonsWrap>
              <ButtonDir onClick={() => openPopup("move_channel", "popup_window")} title="Перейти"><img src={dir_white} alt="dir icon" width={16} height={13} /></ButtonDir>
              <ButtonSetting onClick={() => openPopup()} title="Настройки"><img src={setting} alt="setting icon" width={16} height={16} /></ButtonSetting>
              <ButtonDel onClick={() => deleteChannel(channel.id)} title="Удалить"><img src={del} alt="del icon" width={14} height={16} /></ButtonDel>
            </ButtonsWrap>
          </GridItem>
        ));
      })()}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding-bottom: 30px;
  padding: 0 24px;
  @media (max-width: 1600px) {
    padding: 0;
  }
  @media (max-width: 768px) {
    gap: 8px;
    padding: 0 32px;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #1C2438;
  border-radius: 16px;
  text-align: center;
  @media (max-width: 768px) {
    padding: 16px 8px;
  }
`;
const GridItemNum = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const GridImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
`;
const GridStatus = styled.button`
  padding: 18px 24px;
  border-radius: 12px;
  color: #6A7080;
  border: 2px solid #2A344C;
  font-size: 14px;
  font-weight: 700;
  background: transparent;
  @media (max-width: 768px) {
    padding: 18px 20px;
  }
  &:hover {
    background-color: #336CFF;
    color: #fff;
  }
`;

const GridOnline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.$online ? '#D6DCEC' : '#EF6284'};
`;

const StatusIndicator = styled.span`
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
  margin-right: 0;
  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`;
const NoChannels = styled.td`
  border-radius: 24px !important;
  text-align: center;
  color: #6A7080;
  padding: 24px 0 !important;
  font-weight: 600;
  background-color: #1C2438;
`;

export default GridGroups;