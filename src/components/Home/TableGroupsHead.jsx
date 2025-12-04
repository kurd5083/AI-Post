import { useEffect, useState } from "react";
import styled from "styled-components";
import dir_filled from "@/assets/TableGroups/dir-filled.svg";
import dir from "@/assets/TableGroups/dir.svg";
import dir_active from "@/assets/TableGroups/dir-active.svg";
import show_card from "@/assets/TableGroups/show-card.svg";
import show_table from "@/assets/TableGroups/show-table.svg";
import dir_gray from "@/assets/TableGroups/dir-gray.svg";
import useResolution from "@/lib/useResolution";
import useSwipeAllowed from "@/lib/useSwipeAllowed";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TableGroups = () => {
	const { isSwipe } = useSwipeAllowed(768);

	const { isSmall } = useResolution(480);
	return (
		<TableGroupsContainer>
			<TableGroupsHead>
				<TableGroupsHeadLeft
					key={isSwipe}
					spaceBetween={40}
					slidesPerView="auto"
					allowTouchMove={isSwipe}
				>
					<TableGroupsHeadDir><img src={dir_filled} alt="dir icon" />Создать папку</TableGroupsHeadDir>
					<TableGroupsHeadBtn><img src={dir} alt="dir icon" /><p>Основная папка</p> <mark>6</mark></TableGroupsHeadBtn>
					<TableGroupsHeadBtn><img src={dir_active} alt="dir icon" /><p>Олимпиада 2027</p> <mark>16</mark></TableGroupsHeadBtn>
				</TableGroupsHeadLeft>
				<TableGroupsHeadRight>
					<TableGroupsHeadAdd>{isSmall ? "+ Добавить" : "+ Добавить канал"}</TableGroupsHeadAdd>
					<TableGroupsHeadShow><img src={show_card} alt="show icon" /></TableGroupsHeadShow>
					<TableGroupsHeadShow><img src={show_table} alt="show icon" /></TableGroupsHeadShow>
					<TableGroupsHeadShow><img src={dir_gray} alt="dir icon" /></TableGroupsHeadShow>
					<TableGroupsHeadShow><img src={show_table} alt=" icon" /></TableGroupsHeadShow>
				</TableGroupsHeadRight>
			</TableGroupsHead>
		</TableGroupsContainer>
	)
}
const TableGroupsContainer = styled.section`
  margin-top: 80px;
	padding: 0 clamp(0px, calc((100vw - 1600px) * 24 / 400), 24px);
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
    padding: 0 32px;
  }
	@media (max-width: 480px) {
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
    padding: 0 32px;
  }
	@media(max-width: 480px) {
    padding: 0 24px;
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
  border: 2px solid #1F273B;
  width: 48px;
  height: 48px;
  border-radius: 12px;

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