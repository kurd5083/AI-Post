import styled from "styled-components";
import PageHead from '@/components/PageHead'
import CustomSelect from '@/shared/CustomSelect'
import BtnBase from "@/shared/BtnBase";
import { Link } from "react-router";
import { promotionsDatas } from "@/data/promotionsDatas";

const Promotion = () => {
	return (
		<PromotionContainer>
			<PageHead />
			<PromotionHead>
				<PromotionHeadText $active={true}>Продвижение</PromotionHeadText>
				<Link to='/my-orders'><PromotionHeadText >Подписки</PromotionHeadText></Link>
			</PromotionHead>
			<PromotionFilter>
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
			</PromotionFilter>
			<PromotionCards>
				{promotionsDatas.map((item) => (
					<PromotionCard>
						<img src={item.icon} alt={`${item.title} icon`} />
						<PromotionCardInfo>
							<PromotionCardArea>{item.area}</PromotionCardArea>
							<h3>{item.title}</h3>
							<PromotionCardDesc>{item.description}</PromotionCardDesc>
							<BtnBase $color="#fff" $bg="#336CFF" $padding="17px 80px">Заказать</BtnBase>
						</PromotionCardInfo>
					</PromotionCard>
				))}
			</PromotionCards>
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
	grid-template-columns: repeat(2, minmax(400px, 1fr));
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
		max-width: 350px;
	}
`
const PromotionCardArea = styled.p`
	font-size: 14px;
	font-weight: 700;
	color: #336CFF;
	margin-bottom: 16px;
`
const PromotionCardDesc = styled.p`
	font-size: 14px;
	line-height: 18px;
	font-weight: 600;
	color: #6A7080;
	max-width: 350px;
	margin-bottom: 32px;
	
	@media(max-width: 480px) {
 		margin-bottom: 24px;
  }
`
export default Promotion
