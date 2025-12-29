import { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { useUpdateWorkMode } from "@/lib/channels/useUpdateWorkMode";
import { usePopupStore } from "@/store/popupStore"
import CustomSelectSec from "@/shared/CustomSelectSec";
import { useUpdateChannelPremoderationMinutes } from "@/lib/mode/useUpdateChannelPremoderationMinutes";
import { useUpdateChannelField } from "@/lib/channels/useUpdateChannelField";


const ModePopup = () => {
    const { popup } = usePopupStore();
    const channelId = popup?.data?.channelId;

    const [selectedMode, setSelectedMode] = useState(null);
    const [requireApproval, setRequireApproval] = useState(false);
    const [premoderationMinutes, setPremoderationMinutes] = useState(30);

    const { mutate: setWorkMode } = useUpdateWorkMode(channelId);
    const { mutate: updatePremoderationMinutes } = useUpdateChannelPremoderationMinutes(channelId);
    const { mutate: toggleField } = useUpdateChannelField();


    useEffect(() => {
        if (popup?.data?.workMode) {
            setSelectedMode(popup.data.workMode);
        }
        if (popup?.data?.canPublishWithoutApproval) {
            setRequireApproval(popup.data.canPublishWithoutApproval);
        }
        if (popup?.data?.premoderationMinutes) {
            setPremoderationMinutes(popup.data.premoderationMinutes);
        }
    }, [popup?.data?.workMode, popup?.data?.canPublishWithoutApproval, popup?.data?.premoderationMinutes]);


    const handleSelectMode = (mode) => {
        setSelectedMode(mode);
        setWorkMode({ workMode: mode });
    };
    const handleChangeMinutes = (option) => {
        setPremoderationMinutes(option.value);
        updatePremoderationMinutes({ minutes: option.value });
    };
    const handleToggleApproval = () => {
        const newValue = !requireApproval;
        setRequireApproval(newValue);
        toggleField({ channelId, field: "canPublishWithoutApproval" });
    };

    return (
        <ModeContent>
            <ModeContentTitle>Выберите один режим работы</ModeContentTitle>
            <div>
                <ModeContentItem>
                    <Checkbox
                        checked={selectedMode === "AUTOPOSTING"}
                        onChange={() => handleSelectMode("AUTOPOSTING")}
                    >
                        <div>
                            <h4>Автопостинг</h4>
                            <p>Сервис будет автоматически осуществлять публикации в ваш канал или группу в
                                соответствии с заданными таймерами и днями недели</p>
                        </div>
                    </Checkbox>
                </ModeContentItem>
                <ModeContentItem>
                    <Checkbox
                        checked={selectedMode === "PREMODERATION"}
                        onChange={() => handleSelectMode("PREMODERATION")}
                    >
                        <div>
                            <h4>Премодерация</h4>
                            <p>Наш бот будет отправлять вам посты на предварительную модерацию за указанное
                                вами время, предоставляя возможность принять решение о публикации</p>
                        </div>
                    </Checkbox>
                </ModeContentItem>
            </div>
            {selectedMode === "PREMODERATION" && (
                <>
                    <ModeContentTitle>Параметры премодерации</ModeContentTitle>

                    <CustomSelectSec
                        value={premoderationMinutes}
                        onChange={handleChangeMinutes}
                        options={[
                            { label: "15 минут", value: 15 },
                            { label: "30 минут", value: 30 },
                        ]}
                        width="215px"
                        fs="24px"
                    />

                    <ModeContentItem>
                        <Checkbox
                            checked={requireApproval}
                            onChange={handleToggleApproval}
                        >
                            <div>
                                <h4>Не публиковать без одобрения</h4>
                                <p>
                                    Сервис сформирует пост и отправит вам через бота.
                                    Решение о публикации будете принимать вы
                                </p>
                            </div>
                        </Checkbox>
                    </ModeContentItem>
                </>
            )}
        </ModeContent>
    )
}
const ModeContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0 56px;

    @media(max-width: 1600px) {
        padding: 0 32px;
    }
    @media(max-width: 768px) {
        padding: 0 24px;
    }
`
const ModeContentTitle = styled.h3`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
`
const ModeContentItem = styled.div`
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
        margin-bottom: 16px;
    }
    
    p {
        font-size: 14px;
        font-weight: 600;
        color: #6A7080;
    }
`

export default ModePopup
