import styled from "styled-components";
import CustomSelect from "@/shared/CustomSelect";
import plus_neutral_green from "@/assets/popup/plus-neutral-green.svg";
import Checkbox from "@/shared/Checkbox";
import TimeInput from "@/shared/TimeInput";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";
import BlocksItems from "@/shared/BlocksItems";

const SchedulePopup = () => {
    const { changeContent } = usePopupStore()
    return (
        <div>
            <ScheduleHead>
                <ScheduleHeadText $active={true}>Расписание</ScheduleHeadText>
                <ScheduleHeadText onClick={() => changeContent("schedule_interval")}>Интервал</ScheduleHeadText>
            </ScheduleHead>
            <ScheduleContent>
                <ScheduleTitle>Часовой пояс</ScheduleTitle>
                <CustomSelect
                    options={[
                        { value: "GMT", label: "GMT" },
                        { value: "PST", label: "PST" },
                        { value: "WAT", label: "WAT" },
                    ]}
                />
                <ScheduleKey>
                    <ScheduleKeyTitle>Выберите интервал</ScheduleKeyTitle>
                    <ScheduleInputContainer>
                        <TimeInput/>
                        <ScheduleImg src={plus_neutral_green} alt="plus icon" width={16} height={16} />
                    </ScheduleInputContainer>
                    <BlocksItems items={['09:00', '15:34', '21:29']} color="#FFF980"/>
                </ScheduleKey>
                <ScheduleKey>
                    <ScheduleKeyTitle>ДНИ НЕДЕЛИ</ScheduleKeyTitle>
                    <ScheduleDays>
                        <ScheduleDaysBlock>
                            <Checkbox color="#FFF980"><h4>Понедельник</h4></Checkbox>
                            <Checkbox color="#FFF980"><h4>Вторник</h4></Checkbox>
                        </ScheduleDaysBlock>
                        <ScheduleDaysBlock>
                            <Checkbox color="#FFF980"><h4>Среда</h4></Checkbox>
                            <Checkbox color="#FFF980"><h4>Четверг</h4></Checkbox>
                        </ScheduleDaysBlock>
                        <ScheduleDaysBlock>
                            <Checkbox color="#FFF980"><h4>Пятница</h4></Checkbox>
                            <Checkbox color="#FFF980"><h4>Суббота</h4></Checkbox>
                        </ScheduleDaysBlock>
                        <ScheduleDaysBlock>
                            <Checkbox color="#FFF980"><h4>Воскресенье</h4></Checkbox>
                        </ScheduleDaysBlock>
                    </ScheduleDays>
                </ScheduleKey>
                <BtnBase $margin="64">Сохранить</BtnBase>
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
    color: ${({$active}) => $active ? '#D6DCEC' : '#6A7080'};
    padding-bottom: 32px;
    border-bottom: 2px solid ${({$active}) => $active ? '#D6DCEC' : '#2E3954'};
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
    margin-bottom: 32px;
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

const ScheduleImg = styled.img`
    padding: 12px;
    background-color: #262A2D;
    border-radius: 50%;
    cursor: pointer;
`
const ScheduleDays = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 24px 80px;

    h4 {
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
    }
`
const ScheduleDaysBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    h4 {
        width: 120px;
    }
`

export default SchedulePopup
