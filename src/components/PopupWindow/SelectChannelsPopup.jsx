import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelectSec";
import CloseIcon from "@/icons/CloseIcon";
import { useUserChannels } from "@/lib/channels/useUserChannels";

const SelectChannelsPopup = () => {
    const { closePopup } = usePopupStore();
    const { userChannels } = useUserChannels();
    console.log(userChannels)
    return (
        <div>
            <SelectChannelsHead>
                <HeadTitle>Выбрать канал</HeadTitle>
                <CloseButton onClick={closePopup}>
                    <CloseIcon color="#336CFF" />
                </CloseButton>
            </SelectChannelsHead>
            <SelectChannelsSubtitle>Выберите канал в </SelectChannelsSubtitle>
            <CustomSelect
                value={folderId}
                onChange={(option) => setFolderId(option.value)}
                width="100%"
                options={
                    userChannels.map((channel) => ({
                        value: channel.id,
                        label: channel.name,
                    }))
                }
            />
            <SelectChannelsButtons>
                <BtnBase $color="#D6DCEC" $bg="#336CFF">Сохранить</BtnBase>
                <BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
            </SelectChannelsButtons>
        </div>
    );
};

const SelectChannelsHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  img {
    cursor: pointer;
  }
`;
const HeadTitle = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  @media(max-width: 480px) {
    font-size: 24px;
    line-height: 24px;
  }
`;
const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SelectChannelsSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;
const SelectChannelsButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
  }
`;

export default SelectChannelsPopup;