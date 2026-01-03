import { useState } from "react";
import styled from "styled-components";
import my_team from "@/assets/popup/my-team.svg";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"

const MyTeamAddPopup = () => {
  const { popup } = usePopupStore();
  const channelName = popup?.data?.channelName;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(channelName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MyTeamContainer>
      <img src={my_team} alt="my team icon" width={129} height={113} />
      <MyTeamTitle>{copied ? "Вы успешно скопировали ссылку" : "Поделитесь вашей командой"}</MyTeamTitle>
      <BtnBase
        $color="#5ABAFF"
        $bg="#1B283C"
        onClick={handleCopy}
      >
        {channelName}
      </BtnBase>
    </MyTeamContainer>
  );
};

const MyTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }

  @media(max-width: 480px) {
    margin-top: 80px;
  }
`;

const MyTeamTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 24px;
  text-align: center;
  transition: all 0.3s ease;
`;

export default MyTeamAddPopup;
