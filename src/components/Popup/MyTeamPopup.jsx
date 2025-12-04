import styled from "styled-components";
import my_team  from "@/assets/popup/my-team.svg";
import BtnSave from "@/shared/BtnSave";

const MyTeamPopup = () => {
  return (
    <MyTeamContainer>
      <img src={my_team} alt="my team icon" width={129} height={113}/>
      <MyTeamTitle>Разделите администрирование со своими коллегами</MyTeamTitle>
      <MyTeamText>Пригласите их по кнопке ниже</MyTeamText>
      <BtnSave $color="#5ABAFF" $bg="#1B283C" $margin="0">Пригласить в команду</BtnSave>
    </MyTeamContainer>
  )
}
const MyTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
  @media(max-width: 480px) {
    margin-top: 80px;
  }
`
const MyTeamTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 24px;
  text-align: center;
`
const MyTeamText = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #6A7080;
  text-align: center;
  line-height: 24px;
`


export default MyTeamPopup
