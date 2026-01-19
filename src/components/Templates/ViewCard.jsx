import styled from "styled-components";
import uses from "@/assets/templates/uses.svg";
import copy from "@/assets/copy.svg";
import SpeakerIcon from "@/icons/SpeakerIcon";
import star from "@/assets/templates/star.svg";
import BtnBase from "@/shared/BtnBase";
import useResolution from "@/lib/useResolution";
import EditIcon from "@/icons/EditIcon";
import DelIcon from "@/icons/DelIcon";
import { useDeletePostTemplate } from "@/lib/template/useDeletePostTemplate";
import { usePopupStore } from "@/store/popupStore"
import { useNotificationStore } from "@/store/notificationStore";
import { useTemplatesStore } from "@/store/templatesStore";

const ViewCard = ({ template }) => {
	const { isSmall } = useResolution(480);
	const { openPopup } = usePopupStore();
	const { addNotification } = useNotificationStore();
	const { templates, setTemplates } = useTemplatesStore();

	const { mutate: deleteTemplate } = useDeletePostTemplate();

	const handleDelete = (id) => {
		deleteTemplate(id, {
			onSuccess: () => {
				addNotification(`Шаблон ${template.title} удалён`, "delete");
			},
			onError: (err) => {
				addNotification(err?.message || "Ошибка удаления шаблона", "error");
			},
		});
	};
	return (
		<CardContainer>
			<CardRating>
				<CardArea>{template.categoryLabel}</CardArea>
				<CardEstimation>
					<img src={star} alt="star icon" width={16} height={16} />
					{template.rating} оценок
				</CardEstimation>
			</CardRating>
			<CardHead>
				<SpeakerIcon color="#EF6284" width={24} height={24}/>
					<HeadTitle>{template.title}</HeadTitle>
			</CardHead>
			<CardInfo>
				<p>{template.content}</p>
			</CardInfo>
			<CardHash>
				{template.hashtags.map((hashtag, index) => (
					<li key={index}>{hashtag}</li>
				))}
			</CardHash>
			<CardBtns>
				<BtnBase $padding="23px" $width="280px">
					{!isSmall && <img src={uses} alt="uses icon" width={11} height={16} />}
					Использовать
				</BtnBase>
				<Buttons>
					<ButtonCopy>
						<img src={copy} alt="copy icon" width={14} height={16} />
					</ButtonCopy>
					<ButtonEdit
						onClick={(e) => {
							e.stopPropagation();
							const updatedTemplates = (templates ?? []).map(t =>
								t.id === template.id ? { ...t, isEditing: true } : t
							);
							setTemplates(updatedTemplates);
						}}
					>
						<EditIcon />
					</ButtonEdit>
					<ButtonDel
						onClick={(e) => {
							e.stopPropagation();
							openPopup("delete_confirm", "popup_window", {
								itemName: template.title,
								onDelete: () => handleDelete(template.id),
							});
						}}
					>
						<DelIcon />
					</ButtonDel>
				</Buttons>
			</CardBtns>
		</CardContainer>
	)
}

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`
const CardRating = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const CardArea = styled.p`
	color: #336CFF;
	font-size: 14px;
	font-weight: 700;
`
const CardEstimation = styled.p`
	display: flex;
	align-items: center;
	gap: 16px;
	font-size: 14px;
	font-weight: 700;
`
const CardHead = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-top: 30px;
`
const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 30px;
	font-size: 14px;
	color: #6A7080;
	font-weight: 600;
	padding-left: 32px;
	border-left: 2px solid #336CFF;
	white-space: pre-line;
	flex-grow: 1;

	ul {
		list-style: disc;
		padding-left: 20px;
	}
`
const HeadTitle = styled.h3`
	font-size: 24px;
	font-weight: 700;
`
const CardHash = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 30px;

	li {
		padding: 16px;
		border-radius: 12px;
		color: #AC60FD;
		background-color: #242440;
		font-size: 14px;
		font-weight: 700;
	}
`
const CardBtns = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 30px;
`

const Buttons = styled.div`
  display: flex;
	gap: 8px;
`;
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);    
  }
`;
const ButtonCopy = styled(BaseButton)`
  border: 2px solid #333E59;
`;
const ButtonEdit = styled(BaseButton)`
  background-color: #333E59;
  color: #fff;
`;
const ButtonDel = styled(BaseButton)`
  border: 2px solid #333E59;
`;

export default ViewCard