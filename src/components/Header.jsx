import styled from "styled-components";
import money from "@/assets/header/money.svg";
import bell from "@/assets/bell.svg";
import acc_icon from "@/assets/acc-icon.png";
import burger from "@/assets/header/burger.svg";
import { usePopupStore } from "@/store/popupStore"
import { useMenuStore } from "@/store/menuStore";

const Header = () => {
	const { openPopup } = usePopupStore();
	const { menu, openMenu, closeMenu } = useMenuStore();

	return (
		<HeaderContainer>
			<HeaderContent>
				<HeaderAvaContainer onClick={() => openPopup("profile")}>
					<HeaderAva src={acc_icon} alt="accaunt icon" />
				</HeaderAvaContainer>
				<HeaderBalanceImg src={money} alt="money icon" />
				<HeaderBalanceContainer>
					<h3>Arseniy P.</h3>
					<HeaderBalanceContent>
						<HeaderSubtext>Баланс:</HeaderSubtext>
						<HeaderBalance>1, 876 <mark>₽</mark></HeaderBalance>
					</HeaderBalanceContent>
				</HeaderBalanceContainer>
				<HeaderBtnAdd onClick={() => openPopup("replenish")}>+ Пополнить</HeaderBtnAdd>
			</HeaderContent>
			<HeaderBtns>
				<HeaderBtnBell onClick={() => openPopup("notifications")}><img src={bell} alt="bell icon" width={20} height={24}/></HeaderBtnBell>
				<HeaderBtnBurger onClick={() => menu ? closeMenu() : openMenu()}><img src={burger} alt="burger icon" width={16} height={11}/></HeaderBtnBurger>
			</HeaderBtns>
		</HeaderContainer>
	)
}

const HeaderContainer = styled.header`
	position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 56px;
  z-index: 1000;
  background-color: #131826;
    
  @media (max-width: 1600px) {
    padding: 24px 32px;
  }

	@media(max-width: 768px) {
		padding: 24px;
	}
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`
const HeaderBalanceImg = styled.img`
 	@media(max-width: 1400px) {
		display: none;
	}
`
const HeaderBalanceContainer = styled.div`
  display: flex;
	flex-direction: column;
	gap: 6px;
	margin-left: 24px;
	h3 {
		display: none;
		font-weight: 700;
		font-size: 14px;
		@media(max-width: 1400px) {
			display: block;
		}
	}

	@media(max-width: 480px) {
		margin-left: 16px;
	}
`
const HeaderBalanceContent = styled.div`
  display: flex;
`
const HeaderSubtext = styled.p`
  color: #6A7080;
  font-size: 14px;
  font-weight: 600;
`
const HeaderAvaContainer = styled.div`
	display: none;
  position: relative;
	@media(max-width: 1400px) {
		display: block;
	}

  &::before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border: 2px solid #131826;
    background-color: #B5EC5B;
    top: 0;
    right: 0;
    border-radius: 50%;
  }
`
const HeaderAva = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 16px;
`
const HeaderBalance = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-left: 16px;

  mark {
    color: #336CFF;
	}
`
const HeaderBtnAdd = styled.button`
  background-color: #151F37;
  color: #336CFF;
  padding: 21px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  margin-left: 24px;
	@media(max-width: 991px) {
		margin-left: 10px;
	}
	@media(max-width: 768px) {
		display: none;
	}
`

const HeaderBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;  
	@media(max-width: 991px) {
		gap: 8px;
	}
`
const HeaderBtnBell = styled.button`
	@media(max-width: 768px) {
		display: none;
	}
`
const HeaderBtnSet = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;  
  color: #6A7080;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid #1F273B;
	@media(max-width: 991px) {
		padding: 14px;
	}
	@media(max-width: 768px) {
		display: none;
	}
`
const HeaderBtnBurger = styled.button`
	align-items: center;
	justify-content: center;
  display: none;
	width: 56px;
	height: 56px;
  border-radius: 12px;
  border: 2px solid #1F273B;

	@media(max-width: 1400px) {
		display: flex;
	}
`
export default Header
