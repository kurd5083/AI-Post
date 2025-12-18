import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import CloseIcon from "@/icons/CloseIcon";
import { useUser } from "@/lib/useUser";
import { useCreateChannel } from "@/lib/useCreateChannel";
import { useChannelFolders } from "@/lib/useChannelFolders";
import CustomSelect from "@/shared/CustomSelectSec";

const CreateChannelPopup = () => {
	const { closePopup } = usePopupStore();
	const { user } = useUser();
	const { folders } = useChannelFolders();
	const { mutate: createChannel } = useCreateChannel();

	const [channelName, setChannelName] = useState("");
	const [channelId, setChannelId] = useState("");
	const [subscribersCount, setSubscribersCount] = useState(0);
	const [avatarUrl, setAvatarUrl] = useState("");
	const [theme, setTheme] = useState("IT");
	const [caption, setCaption] = useState("");
	const [folderId, setFolderId] = useState(null);
	const [keywords, setKeywords] = useState([]);
	const [stopWords, setStopWords] = useState([]);

	const handleCreate = () => {
		if (!channelName || !channelId) return alert("Введите название и ID канала");

		createChannel(
			{
				channelId,
				name: channelName,
				subscribersCount,
				avatarUrl,
				workMode: "AUTOPOSTING",
				premoderationMinutes: 30,
				canPublishWithoutApproval: false,
				keywords,
				stopWords,
				includeSourceLink: true,
				disableMedia: false,
				preserveOriginalText: false,
				forcePosting: false,
				caption,
				ownerTelegramId: Number(user.telegramId),
				sources: [],
				theme,
				folderId,
				autoApprovalEnabled: false,
			},
			{
				onSuccess: () => closePopup(),
			}
		);
	};

	return (
		<div>
			<PopupHead>
				<HeadTitle>Создать канал</HeadTitle>
				<CloseIcon color="#336CFF" onClick={closePopup} />
			</PopupHead>

			<PopupSubtitle>Заполните данные нового канала</PopupSubtitle>

			<PopupTitle>Название канала</PopupTitle>
			<PopupInput
				type="text"
				placeholder="Введите название"
				value={channelName}
				onChange={(e) => setChannelName(e.target.value)}
			/>

			<PopupTitle>ID канала</PopupTitle>
			<PopupInput
				type="text"
				placeholder="@my_channel"
				value={channelId}
				onChange={(e) => setChannelId(e.target.value)}
			/>

			<PopupTitle>Количество подписчиков</PopupTitle>
			<PopupInput
				type="number"
				placeholder="1000"
				value={subscribersCount}
				onChange={(e) => setSubscribersCount(Number(e.target.value))}
			/>

			<PopupTitle>Avatar URL</PopupTitle>
			<PopupInput
				type="text"
				placeholder="https://t.me/i/channelpic/320/channel.jpg"
				value={avatarUrl}
				onChange={(e) => setAvatarUrl(e.target.value)}
			/>

			<PopupTitle>Тема</PopupTitle>
			<PopupInput
				type="text"
				placeholder="IT"
				value={theme}
				onChange={(e) => setTheme(e.target.value)}
			/>

			<PopupTitle>Подпись (Caption)</PopupTitle>
			<PopupInput
				type="text"
				placeholder="Подпишитесь на наш канал!"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>

			<PopupTitle>Папка</PopupTitle>
			<CustomSelect
				placeholder="Без папки"
				value={folderId || ""}
				onChange={(e) => setFolderId(Number(e.target.value) || null)}
				width="100%"
				fs="16px"
				padding="24px"
				options={
					folders
						? folders.map((folder) => ({
							icon: folder.icon || "📁",
							value: folder.id,
							label: folder.name,
						}))
						: []
				}
			/>
			<CreateButtons>
				<BtnBase
					$color="#D6DCEC"
					$bg="#336CFF"
					onClick={handleCreate}
				>
					Создать
				</BtnBase>
				<BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">
					Отменить
				</BtnBase>
			</CreateButtons>
		</div>
	);
};

const PopupHead = styled.div`
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

const PopupSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;

const PopupTitle = styled.h2`
  text-transform: uppercase;
  color: #6a7080;
  font-size: 12px;
  font-weight: 700;
  margin: 48px 0 26px;
  border: none;
`;

const PopupInput = styled.input`
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

const CreateButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 32px;

  button {
    width: 100%;
    justify-content: center;
  }
`;

export default CreateChannelPopup;
