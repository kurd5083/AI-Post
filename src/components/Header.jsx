import styled from "styled-components";
import money from "@/assets/header/money.svg";
import setting from "@/assets/setting.svg";

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={money} alt="money icon"/>
                <HeaderSubtext>Баланс:</HeaderSubtext>
                <HeaderBalance>1, 876 <mark>₽</mark> </HeaderBalance>
                <HeaderBtnAdd>+ Пополнить</HeaderBtnAdd>
            </HeaderContent>
            <HeaderBtnSet><img src={setting} alt="setting icon" />Настройки аккаунта</HeaderBtnSet>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 23px;
    padding: 0 24px;
`
const HeaderContent = styled.div`
    display: flex;
    align-items: center;
`
const HeaderSubtext = styled.p`
    color: #6A7080;
    font-size: 14px;
    font-weight: 600;
    margin-left: 24px;
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
`

const HeaderBtnSet = styled.button`
    display: flex;
    align-items: center;
    gap: 16px;  
    color: #6A7080;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid #1F273B;
`
export default Header
