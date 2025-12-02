import styled from "styled-components";
import CustomSelect from "@/shared/CustomSelect";
import plus_neutral_green from "@/assets/popup/plus-neutral-green.svg";
import Checkbox from "@/shared/Checkbox";
import TimeInput from "../../shared/TimeInput";
import { usePopupStore } from "@/store/popupStore"

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
                        { value: "UTC", label: "UTC" },
                        { value: "Europe/Moscow", label: "Europe/Moscow" },
                        { value: "Europe/Berlin", label: "Europe/Berlin" },
                        { value: "Europe/London", label: "Europe/London" },
                        { value: "Asia/Tokyo", label: "Asia/Tokyo" },
                        { value: "Asia/Shanghai", label: "Asia/Shanghai" },
                        { value: "Asia/Dubai", label: "Asia/Dubai" },
                        { value: "Asia/Kolkata", label: "Asia/Kolkata" },
                        { value: "America/New_York", label: "America/New_York" },
                        { value: "America/Los_Angeles", label: "America/Los_Angeles" },
                        { value: "America/Chicago", label: "America/Chicago" },
                        { value: "America/Sao_Paulo", label: "America/Sao_Paulo" },
                        { value: "Australia/Sydney", label: "Australia/Sydney" },
                        { value: "Australia/Perth", label: "Australia/Perth" },
                    ]}
                />
                <ScheduleKey>
                    <ScheduleKeyTitle>Выберите интервал</ScheduleKeyTitle>
                    <ScheduleInputContainer>
                        <TimeInput/>
                        <ScheduleImg src={plus_neutral_green} alt="plus icon" width={16} height={16} />
                    </ScheduleInputContainer>
                    <ScheduleBlocks>
                        <ScheduleBlock>
                            09:00
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                            </svg>
                        </ScheduleBlock>
                        <ScheduleBlock>
                            15:34
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                            </svg>
                        </ScheduleBlock>
                        <ScheduleBlock>
                            21:29
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                            </svg>
                        </ScheduleBlock>
                    </ScheduleBlocks>
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
const ScheduleBlocks = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 32px;
`
const ScheduleBlock = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    border: 2px solid #333E59;
    padding: 16px 16px 18px 24px;
    max-width: 145px;
    width: 100%;
    font-size: 14px;
    font-weight: 700;

    svg {
        cursor: pointer;
        
        &:hover {
            path {
                fill: #FFF980 
            }
        }
    }     
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
`

export default SchedulePopup
