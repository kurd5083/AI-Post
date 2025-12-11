import { useState } from "react";
import styled from "styled-components";
import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import BtnBase from "@/shared/BtnBase";
import { templatesData } from "@/data/templatesData";
import uses from "@/assets/templates/uses.svg";
import copy from "@/assets/copy.svg";
import edit from "@/assets/templates/edit.svg";
import icon from "@/assets/templates/icon.svg";
import star from "@/assets/templates/star.svg";

const Templates = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	return (
		<>
			<PageHead>
				<BtnBase
					$padding="16px 24px"
					$bg="#336CFF"
					$color="#FFFFFF"
				>
					+ Создать шаблон
				</BtnBase>
			</PageHead>
			<PageFilter
				activeFilter={activeFilter}
        		setActiveFilter={setActiveFilter}
				placeholder="Поиск по шаблонам"
			/>
			<TemplatesCards>
				{templatesData.map((template) => (
					<TemplatesCard key={template.id}>
						<CardRating>
							<CardArea>{template.category}</CardArea>
							<CardEstimation>
								<img src={star} alt="star icon" width={16} height={16} />
								{template.rating} оценок
							</CardEstimation>
						</CardRating>
						<CardHead>
							<img src={icon} alt={template.title} width={24} height={20} />
							<HeadContent>
								<HeadTitle>{template.title}</HeadTitle>
								<HeadUses>
									Всего <mark>{template.uses} использований</mark>
								</HeadUses>
							</HeadContent>
						</CardHead>
						<CardInfo>
							<p>{template.content.intro}</p>
							<p>{template.content.description}</p>
							<ul>
								{template.content.benefits.map((benefit, index) => (
									<li key={index}>{benefit}</li>
								))}
							</ul>
							<p>{template.content.offer}</p>
							<p>{template.content.hashtags}</p>
						</CardInfo>
						<CardHash>
							{template.hashtags.map((hashtag, index) => (
								<li key={index}>{hashtag}</li>
							))}
						</CardHash>
						<CardBtns>
							<BtnBase $padding="24px 85px">
								<img src={uses} alt="uses icon" width={11} height={16} />Использовать
							</BtnBase>
							<ButtonCopy>
								<img src={copy} alt="copy icon" width={14} height={16} />
							</ButtonCopy>
							<ButtonEdit>
								<img src={edit} alt="edit icon" width={18} height={16} />
							</ButtonEdit>
						</CardBtns>
					</TemplatesCard>
				))}
			</TemplatesCards>
		</>
	)
}


const TemplatesCards = styled.div`
	display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 16px;
  padding: 0 24px;
`
const TemplatesCard = styled.div`
	padding: 32px;
	background-color: #181F30;
	border-radius: 24px;
`
const CardRating = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const CardArea = styled.p`
	color: #336CFF;
	font-size: 14px;
	font-weight: 700;
`
const CardEstimation = styled.p`
	display: flex;
	align-items: center;
	gap: 16px;
	font-size: 14px;
	font-weight: 700;
`
const CardHead = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 16px;
	margin-top: 30px;
	img {
		margin-top: 8px;
	}
`
const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 30px;
	font-size: 14px;
	color: #6A7080;
	font-weight: 600;
	padding-left: 32px;
	border-left: 2px solid #336CFF;
	ul {
		list-style: disc;
		padding-left: 20px;
	}
`

const HeadContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`
const HeadTitle = styled.h3`
	font-size: 24px;
	font-weight: 700;
`
const HeadUses = styled.h3`
	display: flex;
	gap: 4px;
	color: #6A7080;
	font-size: 14px;
	font-weight: 700;

	mark {
		color: #D6DCEC;
	}
`
const CardHash = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 30px;
	li {
		padding: 16px;
		border-radius: 12px;
		color: #AC60FD;
		background-color: #242440;
		font-size: 14px;
		font-weight: 700;
	}
`
const CardBtns = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 30px;
`

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
`;
const ButtonCopy = styled(BaseButton)`
  border: 2px solid #333E59;
`;
const ButtonEdit = styled(BaseButton)`
  background-color: #333E59;
`;

export default Templates