import { useState, useEffect } from 'react';
import styled from 'styled-components';
import del from "@/assets/del.svg";
import setting from "@/assets/setting.svg";
import { usePopupStore } from "@/store/popupStore"
import { useChannelsStore } from "@/store/channelsStore";
import { useDeleteChannel } from "@/lib/channels/useDeleteChannel";
import { useChannelsGroupedByFolders } from "@/lib/useChannelsGroupedByFolders";
import DirIcon from '@/icons/DirIcon';
import СhannelPlug from '@/shared/СhannelPlug';
import { useUpdateUserAvatar } from '@/lib/channels/useUpdateUserAvatar';
import edit from "@/assets/templates/edit.svg";
import { useUploadMedia } from '@/lib/mediaLibrary/useUploadMedia';
import { getPendingModerationCount } from '@/api/channels/getPendingModerationCount';
import { useQueryClient } from "@tanstack/react-query";

const GridGroups = () => {
  const { openPopup } = usePopupStore();
  const { selectedId } = useChannelsStore();
  const { channels, channelsPending } = useChannelsGroupedByFolders();

  const { mutate: deleteChannel } = useDeleteChannel();
  const { mutate: updateAvatar } = useUpdateUserAvatar();
  const { mutate: upload, isPending } = useUploadMedia();
  const [pendingCounts, setPendingCounts] = useState({});
  const queryClient = useQueryClient();
  
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
  console.log(channels, 'channels')
  if (channelsPending) {

    return (
      <GridContainer>
        <NoChannels>Загрузка каналов...</NoChannels>
      </GridContainer>
    );
  }

  const currentChannels =
    selectedId === null
      ? channels?.channelsWithoutFolder || []
      : channels?.folders?.find(f => f.id === selectedId)?.channels || [];

  const emptyMessage =
    selectedId === null
      ? "Каналов без папки нет"
      : channels?.folders?.find(f => f.id === selectedId)
        ? `В папке "${channels.folders.find(f => f.id === selectedId).name}" нет каналов`
        : "Папка не найдена";

  if (!currentChannels.length) {
    return (
      <GridContainer>
        <NoChannels>{emptyMessage}</NoChannels>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {currentChannels.map((channel, index) => (
        <GridItem key={channel.id}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id={`img-upload-${channel.id}`}
            onChange={(e) => {
              const files = e.target.files;
              if (!files?.length) return;

              upload([...files], {
                onSuccess: (response) => {
                  const uploaded = response?.[0];

                  if (!uploaded?.url) {
                    return;
                  }
                  updateAvatar({
                    id: channel.id,
                    avatarUrl: uploaded.url,
                  });
                },
              });
            }}
          />
          <GridItemNum>#{index + 1}</GridItemNum>
          <AvatarWrap
            onClick={() => document.getElementById(`img-upload-${channel.id}`).click()}
          >
            {channel?.avatarUrl ? (
              <GridImg src={channel.avatarUrl} alt="Group" />
            ) : (
              <СhannelPlug width="40px" height="40px" text={channel.name} />
            )}
            <EditOverlay><img src={edit} alt='edit icon' /></EditOverlay>
          </AvatarWrap>
          <CellName>{channel.name}</CellName>
          <p>
            {channel?.workMode === "PREMODERATION" && "Предмодерация"}
            {channel?.workMode === "AUTOPOSTING" && "Автопостинг"}
          </p>
          <GridStatus onClick={() => openPopup("premoderation", "popup", { channelId: channel.id, filter: "premoderation" })}>
            <Status>
                  {pendingCounts[channel.id] || 0}
                </Status>
            Премодерация
          </GridStatus>
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
const AvatarWrap = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;

  &:hover img {
    filter: brightness(80%);
  }
  
  &:hover div {
    opacity: 1;
  }
`;
const GridImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.2s ease;
`;
const EditOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  font-weight: 600;
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
  position: relative;
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
    border: 2px solid #336CFF;;
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
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
     transform: translate(40%, -50%);
     font-size: 11px;
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