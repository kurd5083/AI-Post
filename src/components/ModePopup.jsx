import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";

const ModePopup = () => {

    return (
        <ModeContent>
            <ModeContentTitle>Выберите один режим работы</ModeContentTitle>
            <div>
                <ModeContentItem>
                    <Checkbox>
                        <div>
                            <h4>Автопостинг</h4>
                            <p>Сервис будет автоматически осуществлять публикации в ваш канал или группу в
                                соответствии с заданными таймерами и днями недели</p>
                        </div>
                    </Checkbox>
                </ModeContentItem>
                <ModeContentItem>
                    <Checkbox>
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
