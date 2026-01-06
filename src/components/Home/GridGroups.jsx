import styled from 'styled-components';
import del from "@/assets/del.svg";
import setting from "@/assets/setting.svg";
import { usePopupStore } from "@/store/popupStore"
import { useChannelsStore } from "@/store/channelsStore";
import { useDeleteChannel } from "@/lib/channels/useDeleteChannel";
import { useChannelsGroupedByFolders } from "@/lib/useChannelsGroupedByFolders";
import DirIcon from '@/icons/DirIcon';
import ModernLoading from "@/components/ModernLoading";
import AvaPlug from '@/shared/AvaPlug';

const GridGroups = () => {
  const { openPopup } = usePopupStore();
  const { selectedId } = useChannelsStore();
  const { channels, channelsLoading } = useChannelsGroupedByFolders();
  const { mutate: deleteChannel } = useDeleteChannel();

  if (channelsLoading) {
    return <ModernLoading text="Загрузка каналов..." />;
  }
  
  let currentChannels = [];
  let isEmpty = null;

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
      <GridContainer>
        <NoChannels>Каналы отсутствуют</NoChannels>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {currentChannels.map((channel, index) => (
        <GridItem key={channel.id}>
          <GridItemNum>#{index + 1}</GridItemNum>
          {channel?.avatarUrl ? (
            <GridImg src={channel.avatarUrl} alt="Group" />
          ) : (
            <AvaPlug width="40px" height="40px"/>
          )}
          <CellName>{channel.name}</CellName>
          <p>
            {channel?.workMode === "PREMODERATION" && "Предмодерация"}
            {channel?.workMode === "AUTOPOSTING" && "Автопостинг"}
          </p>
          
          <GridStatus onClick={() => openPopup("premoderation", "popup", { channelId: channel.id, filter: "premoderation" })}>Премодерация</GridStatus>
          <ButtonsWrap>
            <ButtonDir onClick={() => openPopup("move_channel", "popup_window", { channelId: channel.id })} title="Перейти">
              <DirIcon />
            </ButtonDir>
            <ButtonSetting onClick={() => openPopup('settings', 'popup', { channelId: channel.id, channelName: channel.channelId })} title="Настройки">
              <img src={setting} alt="setting icon" width={16} height={16} />
            </ButtonSetting>
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
              <img src={del} alt="del icon" width={14} height={16} />
            </ButtonDel>
          </ButtonsWrap>
        </GridItem>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding-bottom: 30px;
  padding: 0 24px;
  @media (max-width: 2000px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1600px) {
    padding: 0;
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    gap: 8px;
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
  transition: transform 0.15s ease, box-shadow 0.15s ease; 

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  &:hover svg {
    transform: scale(1.08);
  }
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
  transition: transform 0.2s ease;
`;

const CellName = styled.span`
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    max-width: 140px;
  }
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
const NoChannels = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
`;

export default GridGroups;