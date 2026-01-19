import styled from "styled-components";
import PageHead from '@/components/PageHead'
import CustomSelect from '@/shared/CustomSelect'
import BtnBase from "@/shared/BtnBase";
import { Link } from "react-router";
import { usePromotionServices } from "@/lib/promotion/usePromotionServices";
import SpeakerIcon from "@/icons/SpeakerIcon";
import ModernLoading from "@/components/ModernLoading";

const Promotion = () => {
	const { servicesData, servicesDataPending } = usePromotionServices();

	return (
		<PromotionContainer>
			<PageHead />
			<PromotionHead>
				<PromotionHeadText $active={true}>Продвижение</PromotionHeadText>
				<Link to='/my-orders'><PromotionHeadText >Мои заказы</PromotionHeadText></Link>
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
			{servicesDataPending ? (
				<ModernLoading text="Загрузка услуг..." />
			) : (
				<PromotionCards>
					{servicesData?.length > 0 ? servicesData.map((item) => (
						<PromotionCard key={item.service}>
							<CardIcon><SpeakerIcon width={24} height={24} /></CardIcon>
							<PromotionCardInfo>
								<PromotionCardArea>{item.category}</PromotionCardArea>
								<h3>{item.name}</h3>
								<PromotionCardDesc>
									<InfoRow>
										<span>Мин/Макс: {item.min} / {item.max}</span>
										<span>Цена: {item.rate}</span>
										<span>Тип: {item.type}</span>
									</InfoRow>

									<Tags>
										{item.refill && <Tag $bg="#336CFF">Refill</Tag>}
										{item.cancel && <Tag $bg="#FF3B30">Cancel</Tag>}
										{item.dripfeed && <Tag $bg="#FFD60A" $color="#000">Dripfeed</Tag>}
									</Tags>
								</PromotionCardDesc>
								<BtnBase $color="#fff" $bg="#336CFF" $padding="17px 80px">
									Заказать
								</BtnBase>
							</PromotionCardInfo>
						</PromotionCard>
					)) : (
						<EmptyBlock>Услуги не найдены</EmptyBlock>
					)}
				</PromotionCards>
			)}
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
const CardIcon = styled.div`
	margin-top: 40px;
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

const InfoRow = styled.div`
  display: flex;
	flex-direction: column;
	align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6A7080;

  span {
    background-color: #1F2538;
    padding: 6px 10px;
    border-radius: 8px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.span`
  background-color: ${({ $bg }) => $bg || '#fff'};
  color: ${({ $color }) => $color || '#fff'};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 8px;
`
const EmptyBlock = styled.div`
	text-align: center;
	color: #6A7080;
	padding: 48px 0;
	font-weight: 600;
	background-color: #1C2438;
	border-radius: 16px;
	margin-top: 40px;
`;
export default Promotion
