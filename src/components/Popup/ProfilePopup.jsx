import styled from "styled-components";
import Statistics from "@/components/Home/Statistics"
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"
import acc_icon from "@/assets/acc-icon.png";

const ProfilePopup = () => {
  const { changeContent } = usePopupStore();

  return (
    <div>
      <ProfileHead>
        <ProfileLeft>
        <ProfileAvaContainer>
          <ProfileAva src={acc_icon} alt="accaunt icon" />
        </ProfileAvaContainer>
        <ProfileName>Arseniy Popkov</ProfileName>
        </ProfileLeft>
        <BtnBase $padding="17px 24px" $bg="#37273F" $color="#EF6284">Выйти из аккаунта</BtnBase>
      </ProfileHead>
      <Statistics padding={false} />
      <ProfileBalance>
        <h2>Ваш баланс:</h2>
        <p>15.500<mark>,48</mark> руб.</p>
        <BtnBase $padding="21px 24px" onClick={() => changeContent("replenish")}>+ Пополнить кошелек</BtnBase>
      </ProfileBalance>
      <ProfileInfos>
        <ProfileInfo>
          <h2>4</h2>
          <p>Подключено каналов</p>
        </ProfileInfo>
        <ProfileInfo>
          <h2>156</h2>
          <p>Создано постов за все время</p>
        </ProfileInfo>
      </ProfileInfos>
    </div>
  )
}

const ProfileHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
const ProfileAvaContainer = styled.div`
  position: relative;

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
const ProfileAva = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 16px;
`
const ProfileName = styled.h1`
  font-size: 48px;
  line-height: 48px;
  font-weight: 700;
`

const ProfileBalance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;

  h2 {
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
  }
  p {
    font-size: 48px;
    line-height: 48px;
    font-weight: 700;
    mark {
      color: #6A7080;
    }
  }
`
const ProfileInfos = styled.div`
  display: flex;
  gap: 64px;
  margin-top: 50px;
`
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 36px;
    line-height: 36px;
    font-weight: 700;
  }
  p {
    position: relative;
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: #6A7080;
    padding-bottom: 30px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 32px;
      height: 2px;
      background-color: #336CFF;
    }
  }
`
export default ProfilePopup
