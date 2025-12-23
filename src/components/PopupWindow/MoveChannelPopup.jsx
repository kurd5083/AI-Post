import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import dir_active from "@/assets/table-groups/dir-active.svg";
import CheckboxCircle from "@/shared/CheckboxCircle";
import CloseIcon from "@/icons/CloseIcon";
import { useMoveChannelToFolder } from "@/lib/channels/useMoveChannelToFolder";
import { useChannelsGroupedByFolders } from "@/lib/useChannelsGroupedByFolders";
import { useUser } from "@/lib/useUser";

const MoveChannelPopup = () => {
	const { popup, closePopup } = usePopupStore();
	const { mutate: moveChannel, isPending } = useMoveChannelToFolder();
	const { channels } = useChannelsGroupedByFolders();
	const [selectedFolderId, setSelectedFolderId] = useState(null);
	const { user } = useUser();

	const handleMove = (folderId, channelId) => moveChannel({ folderId, channelId, ownerTelegramId: String(user.telegramId), });

	return (
		<div>
			<MoveChannelHead>
				<HeadTitle>Переместить канал в папку</HeadTitle>
				<CloseButton onClick={closePopup}>
					<CloseIcon color="#336CFF"/>
				</CloseButton>
			</MoveChannelHead>
			<MoveChannelSubtitle>Выберите папку для канала “Все о криптовалюте”</MoveChannelSubtitle>
			<MoveChannelUl>
				<ChannelItem onClick={() => setSelectedFolderId(null)}>
					<img src={dir_active} alt="dir icon" width={31} height={21} />
					<ItemContent>
						<h3>Без папки</h3>
						<p>{channels.channelsWithoutFolder.length} канала</p>
					</ItemContent>
					<CheckboxCircle checked={selectedFolderId === null}/>
				</ChannelItem>
				{channels?.folders.map((folder) => (
					<ChannelItem
						key={folder.id}
						onClick={() => setSelectedFolderId(folder.id)}
					>
						<img src={dir_active} alt="dir icon" width={31} height={21} />
						<ItemContent>
							<h3>{folder.name}</h3>
							<p>{folder.channels.length} канала</p>
						</ItemContent>

						<CheckboxCircle checked={selectedFolderId === folder.id}/>
					</ChannelItem>
				))}
			</MoveChannelUl>
			<MoveChannelButtons>
				<BtnBase $color="#D6DCEC" $bg="#336CFF" $padding="21px" onClick={() => handleMove(selectedFolderId, popup?.data?.channelId)} disabled={isPending}>
					{isPending ? "Перемещение..." : "Переместить"}
				</BtnBase>
				<BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A" $padding="21px">
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