import styled from "styled-components";
import { Link } from "react-router";


import BtnBase from "@/shared/BtnBase";
import CustomSelect from '@/shared/CustomSelect'
import Empty from "@/shared/Empty";

import PageHead from '@/components/PageHead'
import ModernLoading from "@/components/ModernLoading";

import { usePromotionServices } from "@/lib/promotion/usePromotionServices";

import { usePopupStore } from "@/store/popupStore"

const Promotion = () => {
	const { openPopup, changeContent } = usePopupStore();
	const { servicesData, servicesDataPending } = usePromotionServices();
	return (
		<PromotionContainer>
			<PageHead />
			<PromotionHead>
				<PromotionHeadText $active={true}>Продвижение</PromotionHeadText>
				<Link to='/my-orders'><PromotionHeadText >Мои заказы</PromotionHeadText></Link>
			</PromotionHead>
			{/* <PromotionFilter>
				<label>Платформа
					<CustomSelect
						placeholder="Все платформы"
						options={[
							{ value: "Unlimited", label: "Не ограничено" },
							{ value: "1", label: "1" },
							{ value: "2", label: "2" },
							{ value: "3", label: "3" },
						]}
					/>
				</label>
				<label>Категория
					<CustomSelect
						placeholder="Все категории"
						options={[
							{ value: "Unlimited", label: "Не ограничено" },
							{ value: "1", label: "1" },
							{ value: "2", label: "2" },
							{ value: "3", label: "3" },
						]}
					/>
				</label>
			</PromotionFilter> */}
			{/* {servicesDataPending ? (
				<ModernLoading text="Загрузка услуг..." />
			) : (
				servicesData?.length > 0 ? ( */}
			<PromotionCards>
				<PromotionCard>
					<PromotionCardInfo>
						<PromotionCardArea>Telegram</PromotionCardArea>
						<h3>Бусты для канала</h3>
						<PromotionCardDesc>Быстрое увеличение подписчиков и активности</PromotionCardDesc>
						<BtnBase
							$color="#fff"
							$bg="#336CFF"
							$margin="32"
							$padding="17px 80px"
							onClick={() =>
								openPopup("select_channel", "popup_window", {
									onSave: (channelId) =>
										changeContent("boosts", "popup", {
											channelId: channelId,
										}),
									dontClose: true, 
								})
							}
						>
							Заказать
						</BtnBase>
					</PromotionCardInfo>
				</PromotionCard>
				<PromotionCard>
					<PromotionCardInfo>
						<PromotionCardArea>Telegram</PromotionCardArea>
						<h3>Охваты для канала</h3>
						<PromotionCardDesc>Увеличение просмотров публикаций и вовлеченности</PromotionCardDesc>
						<BtnBase
							$color="#fff"
							$bg="#336CFF"
							$margin="32"
							$padding="17px 80px"
							onClick={() =>
								openPopup("select_channel", "popup_window", {
									onSave: (channelId) =>
										changeContent("promotion", "popup", {
											channelId: channelId,
										}),
									dontClose: true, 
								})
							}
						>
							Заказать
						</BtnBase>
					</PromotionCardInfo>
				</PromotionCard>
			</PromotionCards>
			{/* // 	) : (
			// 		<EmptyContainer>
			// 			<Empty icon="🛠️">Услуги не найдены</Empty>
			// 		</EmptyContainer>
			// 	)
			// )} */}
		</PromotionContainer>
	)
}

const PromotionContainer = styled.div`
  padding-bottom: 30px;
`
const PromotionHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
	padding: 0 56px;
	overflow-x: auto;
  scrollbar-width: none;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const PromotionHeadText = styled.p`
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;
    
	@media(max-width: 480px) {
    padding-right: 0;
  }
`
const PromotionFilter = styled.div`
  display: flex;
	flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 48px;
	padding: 0 56px;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }

	label {
		display: flex;
		flex-direction: column;
		gap: 16px;
		font-size: 14px;
		font-weight: 700;
	}
`
const PromotionCards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	gap: 16px;
	padding: 0 56px;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }

	@media(max-width: 991px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
	@media(max-width: 480px) {
 		grid-template-columns: 1fr;
  }
`
const PromotionCard = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 32px;
	background-color: #181F30;
	padding: 32px;
	border-radius: 32px;
	@media(max-width: 480px) {
 		gap: 24px;
		padding: 24px;
  }
	img {
		margin-top: 24px;
	}
`
const PromotionCardInfo = styled.div`
	h3 {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 16px;
	}
`
const PromotionCardArea = styled.p`
	font-size: 14px;
	font-weight: 700;
	color: #336CFF;
	margin-bottom: 16px;
`
const PromotionCardDesc = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #6A7080;
  margin-bottom: 24px;
`

// const EmptyContainer = styled.div`
// 	padding: 0 56px;

// 	@media(max-width: 1600px) {
//     padding: 0 32px;
//   }
//   @media(max-width: 768px) {
//     padding: 0 24px;
//   }
// `;
export default Promotion