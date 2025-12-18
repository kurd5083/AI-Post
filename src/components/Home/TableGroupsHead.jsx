import styled from "styled-components";
import dir_filled from "@/assets/table-groups/dir-filled.svg";
import dir from "@/assets/table-groups/dir.svg";
import dir_active from "@/assets/table-groups/dir-active.svg";
import dir_gray from "@/assets/table-groups/dir-gray.svg";
import refresh from "@/assets/table-groups/refresh.svg";
import useResolution from "@/lib/useResolution";
import useSwipeAllowed from "@/lib/useSwipeAllowed";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePopupStore } from "@/store/popupStore"
import { useViewStore } from "@/store/viewStore";
import GridIcon from "@/icons/GridIcon";
import ListIcon from "@/icons/ListIcon";
import { useChannelFolders } from "@/lib/useChannelFolders";

const TableGroups = () => {
  const { openPopup } = usePopupStore();
	const { isSwipe } = useSwipeAllowed(768);
	const { isSmall } = useResolution(480);
  const { viewType, setGridView, setListView } = useViewStore();
  const { folders, isLoading, isError } = useChannelFolders();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки папок</p>;

  console.log(folders);
	return (
		<TableGroupsContainer>
			<TableGroupsHead>
				<TableGroupsHeadLeft
					key={isSwipe}
					spaceBetween={40}
					slidesPerView="auto"
					allowTouchMove={isSwipe}
				>
					<TableGroupsHeadDir onClick={() => openPopup("create_folder", "popup_window")}><img src={dir_filled} alt="dir icon"/>Создать папку</TableGroupsHeadDir>
					
          <TableGroupsHeadBtn><img src={dir} alt="dir icon" /><p>Основная папка</p> <mark>6</mark></TableGroupsHeadBtn>
					<TableGroupsHeadBtn><img src={dir_active} alt="dir icon" /><p>Олимпиада 2027</p> <mark>16</mark></TableGroupsHeadBtn>
				</TableGroupsHeadLeft>
				<TableGroupsHeadRight>
					<TableGroupsHeadAdd>{isSmall ? "+ Добавить" : "+ Добавить канал"}</TableGroupsHeadAdd>
					<TableGroupsHeadShow $active={viewType === "grid"} onClick={setGridView}>
            <GridIcon color={viewType === "grid" ? "#D6DCEC" : "#6A7080"} />
          </TableGroupsHeadShow>
					<TableGroupsHeadShow $active={viewType === "list"} onClick={setListView}>
            <ListIcon color={viewType === "list" ? "#D6DCEC" : "#6A7080"} />
          </TableGroupsHeadShow>
					<TableGroupsHeadShow onClick={() => openPopup("create_folder", "popup_window")}><img src={dir_gray} alt="dir icon" /></TableGroupsHeadShow>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`
const TableGroupsHeadLeft = styled(Swiper)`
  display: flex;
  flex-wrap: wrap;
	margin: 0;
  @media (max-width: 768px) {
    padding: 0 24px;
  }

`
const TableGroupsHeadDir = styled(SwiperSlide)`
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
  cursor: pointer;
	@media(max-width: 480px) {
    display: none;
  }
`
const TableGroupsHeadBtn = styled(SwiperSlide)`
	box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 2px solid #1F273B;
  color: #6A7080;
  padding-bottom: 18px;
  font-size: 14px;
  font-weight: 700;
	width: auto;

  mark {
    color: #6A7080;
  }
  @media(max-width: 1600px) {
    gap: 8px;

    p {
      max-width: 75px;
      white-space: nowrap;  
      overflow: hidden;     
      text-overflow: ellipsis;
    }
  }
`
const TableGroupsHeadRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
	@media (max-width: 768px) {
    padding: 0 24px;
  }
	@media(max-width: 480px) {
    flex-direction: row-reverse
	}
`

const TableGroupsHeadAdd = styled.button`
  background-color: #336CFF;
  color: #fff;
  padding: 15px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  margin-right: 16px;
  
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
  border: 2px solid ${({ $active }) => $active ? 'transporent' : '#1F273B'};
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ $active }) => $active ? '#232836' : 'transporent'};
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