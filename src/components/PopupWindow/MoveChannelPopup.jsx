import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import close from "@/assets/close.svg";
import dir_active from "@/assets/table-groups/dir-active.svg";
import CheckboxCircle from "@/shared/CheckboxCircle";

const MoveChannelPopup = () => {
	const { closePopup } = usePopupStore();
	
	return (
		<div>
			<MoveChannelHead>
				<HeadTitle>Переместить канал в папку</HeadTitle>
				<img
					src={close}
					alt="close icon"
					onClick={closePopup}
				/>
			</MoveChannelHead>
			<MoveChannelSubtitle>Выберите папку для канала “Все о криптовалюте”</MoveChannelSubtitle>
			<MoveChannelUl>
				<ChannelItem>
					<img src={dir_active} alt="dir icon" width={31} height={21} />
					<ItemContent>
						<h3>Крипта</h3>
						<p>2 канала</p>
					</ItemContent>
					<CheckboxCircle />
				</ChannelItem>
				<ChannelItem>
					<img src={dir_active} alt="dir icon" width={31} height={21} />
					<ItemContent>
						<h3>Крипта</h3>
						<p>2 канала</p>
					</ItemContent>
					<CheckboxCircle />
				</ChannelItem>
			</MoveChannelUl>
			<MoveChannelButtons>
				<BtnBase $color="#D6DCEC" $bg="#336CFF">Переместить</BtnBase>
				<BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">
					Отменить
				</BtnBase>
			</MoveChannelButtons>
		</div>
	)
}

const MoveChannelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
`;

const HeadTitle = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
`;

const MoveChannelSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;
const MoveChannelUl = styled.ul`
  display: flex;
	flex-direction: column;
	margin-top: 40px;
`;

const ChannelItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 24px;
	padding: 32px 0;
	border-bottom: 2px solid #2E3954;
	&:first-child {
		padding-top: 0;
	}
	&:last-child {
		padding-bottom: 0;
		border-bottom: 0;
	}
`;
const ItemContent = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
	h3 {
		font-size: 16px;
		font-weight: 700;
	}
	p {
		text-transform: uppercase;
		font-size: 12px;
		font-weight: 700;
		color: #6A7080;
	}
`;
const MoveChannelButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
    justify-content: center;
  }
`;

export default MoveChannelPopup
