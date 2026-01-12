import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import BtnBase from "@/shared/BtnBase";
import CloseIcon from "@/icons/CloseIcon";

const EnterLinkPopup = () => {
	const { popup, goBack, closePopup } = usePopupStore();
	const onSave = popup?.data?.onSave;
	const loading = popup?.data?.loading;
 	const [link, setLink] = useState(""); // Состояние для ссылки

	const handleSave = () => {
		if (!link) return; // Не сохраняем пустую ссылку
		onSave(link);      // Передаем ссылку обратно в popup
		popup && popup?.previousPage.length > 0 ? goBack() : closePopup();
	};

	return (
		<div>
			<SelectChannelsHead>
				<HeadTitle>Введите ссылку</HeadTitle>
				<CloseButton onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()}>
					<CloseIcon color="#336CFF" />
				</CloseButton>
			</SelectChannelsHead>
			<SelectChannelsSubtitle>Ссылка должна начинаться с https:// или http://</SelectChannelsSubtitle>
			<InputField
				type="url"
				placeholder="Введите ссылку сюда"
				value={link}
				onChange={(e) => setLink(e.target.value)}
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
const InputField = styled.input`
  background-color: transparent;
  width: 100%;
  color: #d6dcec;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2e3954;
  &::placeholder {
    color: #d6dcec;
  }
`;
const SelectChannelsButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
  }
`;

export default EnterLinkPopup;