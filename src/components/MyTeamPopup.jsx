import styled from "styled-components";
import my_team  from "@/assets/popup/my-team.svg";

const MyTeamPopup = () => {
  return (
    <MyTeamContainer>
      <img src={my_team} alt="my team icon" width={129} height={113}/>
      <MyTeamTitle>Разделите администрирование со своими коллегами</MyTeamTitle>
      <MyTeamText>Пригласите их по кнопке ниже</MyTeamText>
      <MyTeamBtn>Пригласить в команду</MyTeamBtn>
    </MyTeamContainer>
  )
}
const MyTeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 165px;
`
const MyTeamTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin: 40px 0 24px;
`
const MyTeamText = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 32px;
    color: #6A7080;
`
const MyTeamBtn = styled.button`
    border-radius: 12px;
    font-weight: 700;
    background-color: #1B283C;
    color: #5ABAFF;
    padding: 21px 32px;
`

export default MyTeamPopup
