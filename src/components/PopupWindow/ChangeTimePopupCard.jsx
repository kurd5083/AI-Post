import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import CloseIcon from "@/icons/CloseIcon";
import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useUpdatePostTime } from "@/lib/posts/useUpdatePostTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ChangeTimePopupCard = () => {
	const { popup, goBack } = usePopupStore();
	const { addNotification } = useNotificationStore();
	const { mutate: updatePostTime, isPending: isTimePending } = useUpdatePostTime();

	const postId = popup?.data?.postId;
	const channelId = popup?.data?.channelId;
	const publishedAt = popup?.data?.time;

	const initialDate = publishedAt ? new Date(publishedAt) : null;
	const initialHours = publishedAt ? new Date(publishedAt).getUTCHours().toString().padStart(2, "0") : "";
	const initialMinutes = publishedAt ? new Date(publishedAt).getUTCMinutes().toString().padStart(2, "0") : "";

	const [date, setDate] = useState(initialDate);
	const [hoursState, setHours] = useState(initialHours);
	const [minutesState, setMinutes] = useState(initialMinutes);

	const handleHoursChange = (e) => {
		let value = e.target.value;
		if (/^[0-9]*$/.test(value) && value.length <= 2) {
			if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 23)) {
				setHours(value);
			}
		}
	};

	const handleMinutesChange = (e) => {
		let value = e.target.value;
		if (/^[0-9]*$/.test(value) && value.length <= 2) {
			if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
				setMinutes(value);
			}
		}
	};

	const handleSave = () => {
		const fixedHours = hoursState.padStart(2, "0");
		const fixedMinutes = minutesState.padStart(2, "0");

		const baseDate = new Date(date);
		baseDate.setUTCHours(parseInt(fixedHours, 10));
		baseDate.setUTCMinutes(parseInt(fixedMinutes, 10));
		baseDate.setSeconds(0);
		baseDate.setMilliseconds(0);

		const now = new Date();
		if (baseDate < now) {
			return addNotification("Нельзя выбрать дату и время в прошлом", "info");
		}

		updatePostTime(
			{
				postId,
				channelId,
				publishedAt: baseDate.toISOString(),
			},
			{
				onSuccess: () => {
					addNotification("Время публикации успешно обновлено", "success");
					goBack();
				},
				onError: (err) => addNotification(err.message || "Ошибка обновления времени", "error"),
			}
		);
	};

	return (
		<>
			<ChangeTimeHead>
				<HeadTitle>Изменить дату и время</HeadTitle>
				<CloseButton onClick={() => goBack()}>
					<CloseIcon color="#336CFF" />
				</CloseButton>
			</ChangeTimeHead>

			<ChangeTimeSubtitle>Выберите дату публикации</ChangeTimeSubtitle>
			<DatePickerWrapper>
				<StyledDatePicker
					selected={date}
					onChange={(d) => setDate(d)}
					dateFormat="dd.MM.yyyy"
					locale="ru"
					wrapperClassName="picker-wrapper"
					minDate={new Date()}
				/>
			</DatePickerWrapper>

			<ChangeTimeSubtitle>Выберите время</ChangeTimeSubtitle>
			<TimeWrapper>
				<TimeInputField
					type="text"
					value={hoursState}
					onChange={handleHoursChange}
					placeholder="00"
				/>
				<Colon>:</Colon>
				<TimeInputField
					type="text"
					value={minutesState}
					onChange={handleMinutesChange}
					placeholder="00"
				/>
			</TimeWrapper>

			<ChangeTimeButtons>
				<BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleSave} disabled={isTimePending}>
					{isTimePending ? "Сохранение..." : "Сохранить"}
				</BtnBase>
				<BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={() => goBack()}>
					Отменить
				</BtnBase>
			</ChangeTimeButtons>
		</>
	);
};

const ChangeTimeHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeadTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChangeTimeSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  font-weight: 700;
  margin-top: 24px;
`;

const DatePickerWrapper = styled.div`
  margin-top: 16px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 20px;
  padding: 12px;
  background: transparent;
  border: 1px solid #6a7080;
  color: #d6dcec;
  border-radius: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #336cff;
  }
`;

const TimeWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: 1px solid #6a7080;
  border-radius: 8px;
  background: transparent;
  color: #d6dcec;
  cursor: text;
  margin-top: 16px;
  &:focus-within {
    border-color: #336cff;
  }
`;

const TimeInputField = styled.input`
  width: 50px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  border: none;
  background: transparent;
  color: #d6dcec;

  &:focus {
    outline: none;
  }
`;

const Colon = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #6a7080;
`;

const ChangeTimeButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
  }
`;

export default ChangeTimePopupCard;
