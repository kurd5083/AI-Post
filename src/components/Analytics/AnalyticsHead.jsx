import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";

import ArrowIcon from "@/icons/ArrowIcon";
import EyeIcon from "@/icons/EyeIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import AccountIcon from "@/icons/AccountIcon";
import FireIcon from "@/icons/FireIcon";

const AnalyticsHead = () => {
	const [active, setActive] = useState(0);
	const navigate = useNavigate();

	return (
		<Head>
			<Arrow onClick={() => navigate(-1)}>
				<PopupArrow><ArrowIcon width={8} height={16} /></PopupArrow>Назад
			</Arrow>
			{/* <HeadUl>
				<HeadLi $active={active === 0} onClick={() => setActive(0)}>
					<EyeIcon color={active === 0 ? "#336CFF" : "#6A7080"} hoverColor={active === 0 ? "#336CFF" : "#6A7080"} width={18} height={13} />
					Охваты
				</HeadLi>
				<HeadLi $active={active === 1} onClick={() => setActive(1)}>
					<AccountIcon color={active === 1 ? "#336CFF" : "#6A7080"} hoverColor={active === 1 ? "#336CFF" : "#6A7080"} width={18} height={13} />
					Подписчики
				</HeadLi>
				<HeadLi $active={active === 2} onClick={() => setActive(2)}>
					<FireIcon color={active === 2 ? "#336CFF" : "#6A7080"} hoverColor={active === 2 ? "#336CFF" : "#6A7080"} width={16} height={14} />
					Упоминания
				</HeadLi>
				<HeadLi $active={active === 3} onClick={() => setActive(3)}>
					<SpeakerIcon color={active === 3 ? "#336CFF" : "#6A7080"} hoverColor={active === 3 ? "#336CFF" : "#6A7080"} width={16} height={14} />
					Публикации
				</HeadLi>
			</HeadUl> */}
			<div></div>
		</Head>
	)
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 40px;
	padding: 0 56px 30px;

  @media(max-width: 1600px) { 
    padding: 0 32px 30px 
	}	
  @media(max-width: 768px) { 
    padding: 0 24px 30px
  }
`
const Arrow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #6A7080;
  font-weight: 700;
  cursor: pointer;
`
const PopupArrow = styled.div`
  transform: rotate(180deg);
  color: #D6DCEC;
`
const HeadUl = styled.ul`
  display: flex;
  gap: 48px;
`
const HeadLi = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#D6DCEC" : "#6A7080")};
  cursor: pointer;
`;

export default AnalyticsHead