import { useState } from "react";
import styled from "styled-components";

import CloseIcon from "@/icons/CloseIcon";

import BtnBase from "@/shared/BtnBase";
import CustomSelectSec from "@/shared/CustomSelectSec";

import { useUserChannels } from "@/lib/channels/useUserChannels";

import { useNotificationStore } from "@/store/notificationStore";
import { usePopupStore } from "@/store/popupStore";

const SelectChannelsPopup = () => {
	const { popup, goBack, closePopup } = usePopupStore();
	const onSave = popup?.data?.onSave;
	const loading = popup?.data?.loading;
  	const { addNotification } = useNotificationStore();

	const { userChannels } = useUserChannels();
	const [selectedChannelId, setSelectedChannelId] = useState(null);

	const handleSave = () => {
		if (!selectedChannelId) {
			addNotification("Выберите канал", "info");
			return;
		}
		onSave(selectedChannelId);

		if (!popup?.data?.dontClose) {
			popup && popup?.previousPage.length > 0 ? goBack() : closePopup();
		}
	};

	return (
		<div>
			<SelectChannelsHead>
				<HeadTitle>Выбрать канал</HeadTitle>
				<CloseButton onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()}>
					<CloseIcon color="#336CFF" />
				</CloseButton>
			</SelectChannelsHead>
			<SelectChannelsSubtitle>Укажите канал, в котором будет опубликована новость</SelectChannelsSubtitle>
			<CustomSelectSec
				value={selectedChannelId}
				onChange={(option) => setSelectedChannelId(option.value)}
				width="100%"
				options={userChannels?.map((channel) => ({
					value: channel.id,
					label: channel.name,
					icon: channel.name,
				}))}
			/>
			<SelectChannelsButtons>
				<BtnBase onClick={handleSave} $color="#D6DCEC" $bg="#336CFF">{loading ? "Сохраняем..." : "Сохранить"}</BtnBase>
				<BtnBase onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
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
	margin-bottom: 40px;
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