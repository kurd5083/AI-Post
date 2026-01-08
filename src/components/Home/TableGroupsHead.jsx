import styled, { css } from "styled-components";
import refresh from "@/assets/table-groups/refresh.svg";
import del from "@/assets/del.svg";
import useResolution from "@/lib/useResolution";
import useSwipeAllowed from "@/lib/useSwipeAllowed";
import { useChannelsGroupedByFolders } from "@/lib/useChannelsGroupedByFolders";
import { useDeleteFolder } from "@/lib/channels/folder/useDeleteFolder";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePopupStore } from "@/store/popupStore"
import { useViewStore } from "@/store/viewStore";
import { useChannelsStore } from "@/store/channelsStore";
import GridIcon from "@/icons/GridIcon";
import ListIcon from "@/icons/ListIcon";
import DirIcon from "@/icons/DirIcon";
import { useTelegramBotInfo } from "@/lib/useTelegramBotInfo";
import { useNotificationStore } from "@/store/notificationStore";

const TableGroups = () => {
  const { openPopup } = usePopupStore();
  const { isSwipe } = useSwipeAllowed(768);
  const { isSmall } = useResolution(480);
  const { viewType, setGridView, setListView } = useViewStore();
  const { selectedId, setId } = useChannelsStore();
  const { channels } = useChannelsGroupedByFolders();
  const { mutate: deleteFolder } = useDeleteFolder();
  const { botInfo } = useTelegramBotInfo();
  const { addNotification } = useNotificationStore();

  return (
    <TableGroupsContainer>
      <TableGroupsHead>
        <TableGroupsHeadLeft>
          <TableGroupsHeadDir onClick={() => openPopup("create_folder", "popup_window")}>
            <DirIcon color="#336CFF" />
            Создать папку
          </TableGroupsHeadDir>
          <BaseFolderBtn
            onClick={() => setId(null)}
            $active={selectedId === null}
          >
            <DirIcon color="#6A7080" />
            <p>Без папки</p>
            <mark>{channels?.totalChannelsWithoutFolder}</mark>
          </BaseFolderBtn>
          <LeftSwiper
            key={isSwipe}
            spaceBetween={40}
            slidesPerView="auto"
          >
            {channels?.folders?.map((folder) => (
              <TableGroupsSlide key={folder.id}>
                <SlideBtn $active={selectedId === folder.id} onClick={() => setId(folder.id)}>
                  <DirIcon color={folder.color} />
                  <FolderName>{folder.name}</FolderName>
                  <mark>{folder.channels.length}</mark>
                  <DeleteFolderButton
                    src={del}
                    alt="del icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPopup("delete_confirm", "popup_window", {
                        itemName: folder.name,
                        onDelete: () => deleteFolder(folder.id, {
                          onSuccess: () => addNotification(`Папка "${folder.name}" удалена`, "delete"),
                          onError: () => addNotification(`Не удалось удалить папку "${folder.name}"`, "error"),
                        }),
                      });
                    }}
                  />
                </SlideBtn>
              </TableGroupsSlide>
            ))}
          </LeftSwiper>
        </TableGroupsHeadLeft>
        <TableGroupsHeadRight>
          <TableGroupsHeadAdd
            onClick={() =>
              window.open(
                `https://t.me/${botInfo?.username}?startchannel=1&admin=change_info+post_messages+edit_messages+invite+users+pin_messages+manage_chat`
              )
            }
          >{isSmall ? "+ Добавить" : "+ Добавить канал"}</TableGroupsHeadAdd>
          <TableGroupsHeadShow $active={viewType === "grid"} onClick={setGridView}>
            <GridIcon color={viewType === "grid" ? "#D6DCEC" : "#6A7080"} />
          </TableGroupsHeadShow>
          <TableGroupsHeadShow $active={viewType === "list"} onClick={setListView}>
            <ListIcon color={viewType === "list" ? "#D6DCEC" : "#6A7080"} />
          </TableGroupsHeadShow>
          <TableGroupsHeadShow onClick={() => openPopup("create_folder", "popup_window")}>
            <DirIcon color="#6A7080" />
          </TableGroupsHeadShow>
          <TableGroupsHeadShow><img src={refresh} alt="refresh icon" /></TableGroupsHeadShow>
        </TableGroupsHeadRight>
      </TableGroupsHead>
    </TableGroupsContainer>
  )
}
const TableGroupsContainer = styled.section`
  margin-top: 80px;
	padding: 0 56px;
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
	@media (max-width: 768px) {
    padding: 0;
  }
  @media (max-width: 480px) {
    margin-top: 48px;
  }
`
const TableGroupsHead = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px 0;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`
const TableGroupsHeadLeft = styled.div`
  display: flex;
  gap: 20px;
  grid-column: 1 /span 5;
  @media (max-width: 1600px) {
    grid-column: 1 /span 6;
  }
  @media (max-width: 1400px) {
    grid-column: 1 /span 5;
  }
  @media (max-width: 991px) {
    grid-column: 1 /span 6;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`
const TableGroupsHeadDir = styled.button`
  white-space: nowrap;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #151F37;
  color: #336CFF;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
	width: auto;

	@media(max-width: 480px) {
    display: none;
  }
`
const LeftSwiper = styled(Swiper)`
  width: 100%;
`
const baseFolderStyles = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 2px solid ${({ $active }) => ($active ? "#FFFFFF" : "#1F273B")};
  color: ${({ $active }) => ($active ? "#FFFFFF" : "#6A7080")};
  padding-bottom: 18px;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    border-bottom-color: #FFFFFF;
    transform: translateY(-2px);
  }

  mark {
    color: #6A7080;
  }

  @media (max-width: 1600px) {
    gap: 8px;

    p {
      max-width: 75px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
const BaseFolderBtn = styled.button`
  ${baseFolderStyles}
  white-space: nowrap;
`;
const TableGroupsSlide = styled(SwiperSlide)`
  width: fit-content;
`;
const SlideBtn = styled.button`
  ${baseFolderStyles}
  height: 100%;
`;

const FolderName = styled.p`
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DeleteFolderButton = styled.img`
  cursor: pointer;
  width: 12px;
`;
const TableGroupsHeadRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  
	@media (max-width: 768px) {
    padding: 0 24px;
  }
	@media(max-width: 480px) {
    flex-direction: row-reverse
	}
`
const TableGroupsHeadAdd = styled.button`
  white-space: nowrap;
  background-color: #336CFF;
  color: #fff;
  padding: 15px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  margin-right: 16px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #295BDB;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
  
	@media(max-width: 1600px) {
    margin-right: 0;
  }
	@media(max-width: 480px) {
    padding: 15px 12px;
  }
`
const TableGroupsHeadShow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ $active }) => ($active ? 'transparent' : '#1F273B')};
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ $active }) => ($active ? '#232836' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background-color: #1C2438;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  &:nth-child(n+4) {
    display: none;
  }
  @media(max-width: 480px) {
    display: flex;
    &:nth-child(n+4) {
      display: flex;
    }
	}
`

export default TableGroups