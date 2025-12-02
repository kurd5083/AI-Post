import styled from "styled-components";
import plus_crimson from "@/assets/popup/plus-crimson.svg";

const FilteringPopup = () => {
    return (
        <FilteringContainer>
            <FilteringText>Добавьте ключевые слова для фильтрации новостей по заголовкам, или<br />
                оставьте список пустым, чтобы получать все новости. <mark>В Telegram-каналах <br />
                и группах/пабликах VK</mark> поиск осуществляется по всему содержанию.</FilteringText>
            <FilteringKey>
                <FilteringKeyTitle>Ключевые слова</FilteringKeyTitle>
                <FilteringInputContainer>
                    <FilteringInput type="text" placeholder="Введите ключевое слово" />
                    <FilteringImg src={plus_crimson} alt="plus icon" width={16} height={16} />
                </FilteringInputContainer>
                <FilteringBlocks>
                    <FilteringBlock>
                        Технологии
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                        </svg>
                    </FilteringBlock>
                    <FilteringBlock>
                        Программирование
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                        </svg>
                    </FilteringBlock>
                    <FilteringBlock>
                        Деньги
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                        </svg>
                    </FilteringBlock>
                </FilteringBlocks>
            </FilteringKey>

            <FilteringText>Добавьте стоп-слова, чтобы исключить нежелательные новости по заголовкам. <br />
                В Telegram-каналах и группах/пабликах VK стоп-слова применяются<br />
                <mark> ко всему содержанию.</mark></FilteringText>

            <FilteringKey>
                <FilteringKeyTitle>стоп-слова</FilteringKeyTitle>
                <FilteringInputContainer>
                    <FilteringInput type="text" placeholder="Введите ключевое слово" />
                    <FilteringImg src={plus_crimson} alt="plus icon" width={16} height={16} />
                </FilteringInputContainer>
                <FilteringBlocks>
                    <FilteringBlock>
                        Платный
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                        </svg>
                    </FilteringBlock>
                    <FilteringBlock>
                        Реклама
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                        </svg>
                    </FilteringBlock>
                    <FilteringBlock>
                        Абстракция
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
                        </svg>
                    </FilteringBlock>
                </FilteringBlocks>
            </FilteringKey>
        </FilteringContainer>
    )
}
const FilteringContainer = styled.div`
    
`
const FilteringText = styled.p`
    color: #6A7080;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;

    mark {
        color: #D6DCEC;
    }
    &:nth-of-type(2) {
        margin-top: 48px;
    }
`
const FilteringKey = styled.div`
    margin-top: 40px;
`
const FilteringKeyTitle = styled.h2`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    color: #6A7080;
    margin-bottom: 26px;
`
const FilteringInputContainer = styled.div`
    display: flex;
    gap: 24px;
`
const FilteringInput = styled.input`
    background-color: transparent;
    max-width: 340px;
    width: 100%;
    color: #D6DCEC;
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 24px;
    border: none;
    border-bottom: 2px solid #2E3954;

    &::placeholder {
        color: #D6DCEC;
    }
`
const FilteringImg = styled.img`
    padding: 12px;
    background-color: #2D2740;
    border-radius: 50%;
    cursor: pointer;
`
const FilteringBlocks = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 32px;
`
const FilteringBlock = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    border: 2px solid #333E59;
    padding: 16px 16px 18px 24px;
    max-width: 240px;
    width: 100%;
    font-size: 14px;
    font-weight: 700;

    svg {
        cursor: pointer;
        
        &:hover {
            path {
                fill: #EF6284 
            }
        }
    }     
`
export default FilteringPopup
