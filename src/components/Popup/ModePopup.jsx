import { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { useUpdateWorkMode } from "@/lib/channels/useUpdateWorkMode";
import { usePopupStore } from "@/store/popupStore"

const ModePopup = () => {
	const { popup } = usePopupStore();
    const channelId = popup?.data?.channelId;
    const { mutate: setWorkMode } = useUpdateWorkMode(channelId);
    const [selectedMode, setSelectedMode] = useState("AUTOPOSTING");
    const [premoderationMinutes, setPremoderationMinutes] = useState(30);

    useEffect(() => {
        const mode = popup?.data?.workMode;
        if (mode) {
            setSelectedMode(mode);
        }
    }, [popup?.data?.workMode]);

    const handleSelectMode = (mode) => {
        setSelectedMode(mode);
        if (mode === "PREMODERATION") {
            setWorkMode({ workMode: mode, premoderationMinutes });
        } else {
            setWorkMode({ workMode: mode });
        }
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
