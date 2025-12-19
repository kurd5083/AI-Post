import { useEffect, useState } from "react";
import styled from "styled-components";
import TimeInput from "@/shared/TimeInput";
import Checkbox from "@/shared/Checkbox";
import BtnBase from "@/shared/BtnBase";
import PlusIcon from "@/icons/PlusIcon";
import { useChannelInterval } from "@/lib/channels/useChannelInterval";
import { usePopupStore } from "@/store/popupStore"
import { useUpdateChannelInterval } from "@/lib/channels/useUpdateChannelInterval";

const SchedulePopup = () => {
	const { popup, changeContent, goBack } = usePopupStore()
  const channelId = popup?.data?.channelId;
  // const { channelInterval } = useChannelInterval(channelId);

  const [intervalMinutes, setIntervalMinutes] = useState(60);
  const [isEnabled, setIsEnabled] = useState(false);
  const [avoidNight, setAvoidNight] = useState(false);
  const { mutate: saveInterval, isLoading } = useUpdateChannelInterval(channelId);
  
  // useEffect(() => {
  //   if (channelInterval) {
  //     setIntervalMinutes(channelInterval.intervalMinutes);
  //     setIsEnabled(channelInterval.isEnabled);
  //     setAvoidNight(channelInterval.avoidNight);
  //   }
  // }, [channelInterval]);

  const handleSave = () => {
    const activeStartHour = 1;
    const activeEndHour = 1;

    saveInterval({
      intervalMinutes,
      isEnabled,
      avoidNight,
      activeStartHour,
      activeEndHour,
    });
  };

  const handleSelectCheckbox = (name, value) => {
    console.log("test", isEnabled, name, value)
    if (name === "isEnabled") {
      setIsEnabled(value);
    } else if (name === "avoidNight") {
      setAvoidNight(value); 
    }
  };
  
  const hours = Math.floor(intervalMinutes / 60);
  const minutes = intervalMinutes % 60;

	return (
		<ScheduleContainer>
			<ScheduleHead>  
				<ScheduleHeadText onClick={() => changeContent("schedule")}>Расписание</ScheduleHeadText>
				<ScheduleHeadText $active={true}>Интервал</ScheduleHeadText>
			</ScheduleHead>
			<ScheduleContent>
				<ScheduleTitle>Интервал публикаций</ScheduleTitle>
				<ScheduleDesc>Установите периодичность, с которой система будет отправлять посты.<br />
					Интервал применяется поверх расписания и очереди.<br />
					Для равномерного охвата выбирайте разумные значения.
				</ScheduleDesc>
				<ScheduleKey>
					<ScheduleKeyTitle>Выберите интервал</ScheduleKeyTitle>
					<ScheduleInputContainer>
						<TimeInput 
              hours={hours}
              minutes={minutes}
              onChange={(newHours, newMinutes) => {
                setIntervalMinutes(newHours * 60 + newMinutes);
              }}
            />
						<ScheduleBtn>
              <PlusIcon color="#FFF980"/>
            </ScheduleBtn>
					</ScheduleInputContainer>
					<ScheduleResult>
            Будет публиковаться каждые{" "}
            <mark>
              {hours > 0 && `${hours} ч `}
              {minutes > 0 && `${minutes} мин`}
            </mark>
          </ScheduleResult>
				</ScheduleKey>
				<ScheduleKey>
					<ScheduleKeyTitle>Дополнительно</ScheduleKeyTitle>
					<ScheduleKeyItem>
						<Checkbox checked={isEnabled} onChange={() => handleSelectCheckbox("isEnabled", !isEnabled)}>
              <h4>Активировать интервальную публ.</h4>
            </Checkbox>
					</ScheduleKeyItem>
					<ScheduleKeyItem>
						<Checkbox checked={avoidNight} onChange={() => handleSelectCheckbox("avoidNight", !avoidNight)}>
              <h4>Не публиковать в ночное время</h4>
            </Checkbox>
					</ScheduleKeyItem>
				</ScheduleKey>
				<ScheduleButtons>
					<BtnBase
            $color="#D6DCEC"
            $bg="#336CFF"
            // onClick={() => handleSave()}
            // disabled={isLoading}
          >
            {/* {isLoading ? "Сохраняем..." : "Сохранить"} */}
          </BtnBase>
					<BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
				</ScheduleButtons>
			</ScheduleContent>
		</ScheduleContainer>
	)
}
const ScheduleContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const ScheduleHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;

  @media(max-width: 480px) {
    margin-bottom: 40px;
  }
`
const ScheduleHeadText = styled.p`
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;

  @media(max-width: 480px) {
    padding-right: 0;
  }
`
const ScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
`
const ScheduleTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`
const ScheduleDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;
`
const ScheduleKey = styled.div`
  margin-top: 40px;
`
const ScheduleKeyTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #6A7080;
  margin-bottom: 26px;
`
const ScheduleInputContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`
const ScheduleResult = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;

  mark {
    color: #FFF980;
  }
`
const ScheduleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #262A2D;
  border-radius: 50%;
  cursor: pointer;
`
const ScheduleKeyItem = styled.div`
  display: flex;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;

  &:first-child {
    padding-top: 0;
  }
    
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  h4 {
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
`
const ScheduleButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`

export default SchedulePopup