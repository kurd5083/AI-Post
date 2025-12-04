import styled from "styled-components";
import plus_neutral_green from "@/assets/popup/plus-neutral-green.svg";
import TimeInput from "@/shared/TimeInput";
import { usePopupStore } from "@/store/popupStore"
import Checkbox from "@/shared/Checkbox";
import BtnSave from "@/shared/BtnSave";

const SchedulePopup = () => {
    const { changeContent, goBack } = usePopupStore()
    return (
        <div>
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
                        <TimeInput />
                        <ScheduleImg src={plus_neutral_green} alt="plus icon" width={16} height={16} />
                    </ScheduleInputContainer>
                    <ScheduleResult>Будет публиковаться каждые <mark>9 часов 15 минут</mark></ScheduleResult>
                </ScheduleKey>
                <ScheduleKey>
                    <ScheduleKeyTitle>Дополнительно</ScheduleKeyTitle>
                    <ScheduleKeyItem>
                        <Checkbox>
                            <h4>Активировать интервальную публ.</h4>
                        </Checkbox>
                    </ScheduleKeyItem>
                    <ScheduleKeyItem>
                        <Checkbox>
                            <h4>Не публиковать в ночное время</h4>
                        </Checkbox>
                    </ScheduleKeyItem>
                </ScheduleKey>
                <ScheduleButtons>
                    <BtnSave $color="#D6DCEC" $bg="#336CFF" $margin="0">Сохранить</BtnSave>
                    <BtnSave onClick={goBack} $color="#6A7080" $bg="#191E2D" $margin="0">Отменить</BtnSave>
                </ScheduleButtons>
            </ScheduleContent>
        </div>
    )
}
const ScheduleHead = styled.div`
    display: flex;
    gap: 32px;
    margin-bottom: 48px;
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
`
const ScheduleResult = styled.p`
    font-weight: 700;
    font-size: 16px;
    margin-top: 32px;

    mark {
        color: #FFF980;
    }
`

const ScheduleImg = styled.img`
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
