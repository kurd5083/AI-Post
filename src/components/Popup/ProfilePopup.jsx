import styled from "styled-components";
import Statistics from "@/components/Home/Statistics";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useUser } from "@/lib/useUser";
import { useUserBalance } from "@/lib/useUserBalance";
import { useAuthStore } from "@/store/authStore";

const ProfilePopup = () => {
  const { changeContent } = usePopupStore();
  const { user } = useUser();
  const { balance } = useUserBalance();
  const logout = useAuthStore(state => state.logout);

  return (
    <div>
      <ProfileHead>
        <ProfileLeft>
          <ProfileAvaContainer>
            <ProfileAva src={user?.avatarUrl} alt={user?.username} />
          </ProfileAvaContainer>
          <ProfileName>{user?.firstName} {user?.lastName}</ProfileName>
        </ProfileLeft>
        <ButtonAcc>
          <BtnBase
            $padding="17px 24px"
            $bg="#37273F"
            $color="#EF6284"
            onClick={logout}
          >
            Выйти из аккаунта
          </BtnBase>
        </ButtonAcc>
      </ProfileHead>

      <Statistics />

      <ProfileBalance>
        <h2>Ваш баланс:</h2>
        <p>{balance?.balanceRubles} руб.</p>
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

      <ButtonAccMobile>
        <BtnBase
          $padding="17px 24px"
          $bg="#37273F"
          $color="#EF6284"
          onClick={logout} 
        >
          Выйти из аккаунта
        </BtnBase>
      </ButtonAccMobile>
    </div>
  );
};

const ProfileHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 1400px) {
    display: none;
  }
`
const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  @media(max-width: 480px) {
    font-size: 32px;
    line-height: 32px;
  }
`
const ButtonAcc = styled.div`
  
`
const ProfileBalance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;
  padding: 0 56px ;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }

  h2 {
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
    
  }
  p {
    font-size: 48px;
    line-height: 48px;
    font-weight: 700;
    @media(max-width: 480px) {
      font-size: 40px;
      line-height: 40px;
    }
    mark {
      color: #6A7080;
    }
  }
`
const ProfileInfos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px 64px;
  margin-top: 50px;
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
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
const ButtonAccMobile = styled.div`
  display: none;
  margin-top: 48px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 1400px) {
    display: block;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`
export default ProfilePopup
