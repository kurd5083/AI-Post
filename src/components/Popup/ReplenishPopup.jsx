import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelectSec";
import CheckboxCircle from "@/shared/CheckboxCircle";
import perplexity from "@/assets/popup/perplexity.svg";
import gemini from "@/assets/popup/gemini.svg";
import open_router from "@/assets/popup/open-router.svg";
import { usePopupStore } from "@/store/popupStore";

const ReplenishPopup = () => {
	const { closePopup } = usePopupStore()

	return (
		<ReplenishContainer>
			<ReplenishTitle>Выберите нейросеть</ReplenishTitle>
			<ReplenishCards>
				<ReplenishCard>
					<CardTop>
						<img src={perplexity} alt="perplexity icon" />
						<CheckboxCircle />
					</CardTop>
					<CardTitle>Perplexity</CardTitle>
					<CardDesc>100 руб / около 1.000 симв.</CardDesc>
				</ReplenishCard>
				<ReplenishCard>
					<CardTop>
						<img src={gemini} alt="gemini icon" />
						<CheckboxCircle />
					</CardTop>
					<CardTitle>Gemini</CardTitle>
					<CardDesc>100 руб / около 1.000 симв.</CardDesc>
				</ReplenishCard>
				<ReplenishCard>
					<CardTop>
						<img src={open_router} alt="open router icon" />
						<CheckboxCircle />
					</CardTop>
					<CardTitle>Open Router</CardTitle>
					<CardDesc>100 руб / 1.000 симв. + 10 ген.</CardDesc>
				</ReplenishCard>
			</ReplenishCards>
			<ReplenishTitle>Введите сумму пополнения</ReplenishTitle>
			<ReplenishInput type="text" placeholder="Введите сумму" />
			<ReplenishTitle>ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ</ReplenishTitle>
			<CustomSelect
				padding="24px"
				options={[
					{ value: "card", label: "Банковская карта" },
					{ value: "sbp", label: "СБП (Система быстрых платежей)" },
					{ value: "yoomoney", label: "ЮMoney" },
					{ value: "qiwi", label: "QIWI Кошелек" },
					{ value: "webmoney", label: "WebMoney" },
					{ value: "crypto", label: "Криптовалюта" },
					{ value: "paypal", label: "PayPal" },
					{ value: "applepay", label: "Apple Pay" },
					{ value: "googlepay", label: "Google Pay" },
					{ value: "sberpay", label: "СберПэй" },
					{ value: "tinkoff", label: "Тинькофф" },
					{ value: "invoice", label: "Счет на оплату" },
					{ value: "cash", label: "Наличные" },
					{ value: "installment", label: "Рассрочка" },
					{ value: "bank_transfer", label: "Банковский перевод" },
					{ value: "advance", label: "Авансовый платеж" },
					{ value: "letter_of_credit", label: "Аккредитив" }
				]}
			/>
			<ReplenishButtons>
				<BtnBase $color="#D6DCEC" $bg="#336CFF">Продолжить</BtnBase>
				<BtnBase $color="#D6DCEC" $bg="#242A3B" onClick={() => closePopup()}>Отменить</BtnBase>
			</ReplenishButtons>
		</ReplenishContainer>
	)
}
const ReplenishContainer = styled.div`
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`
const ReplenishTitle = styled.h3`
  text-transform: uppercase;
  margin: 40px 0 26px;
  color: #6A7080;
  font-size: 12px;
  font-weight: 700;

  &:first-child {
    margin-top: 0;
  }
`
const ReplenishCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 8px;
`
const ReplenishCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background-color: #181F31;
  padding: 24px;
`
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CardTitle = styled.h2`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  font-size: 24px;
  font-weight: 700;
  margin-top: 26px;
`
const CardDesc = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
  color: #6A7080;
`

const ReplenishInput = styled.input`
  background-color: transparent;
  max-width: 340px;
  width: 100%;
  color: #D6DCEC;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2E3954;

  &::placeholder {
    color: #D6DCEC;
  }
`
const ReplenishButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`

export default ReplenishPopup