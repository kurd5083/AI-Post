import styled from "styled-components";
import plus_crimson from "@/assets/popup/plus-crimson.svg";
import del from "@/assets/popup/del.svg";

const FilteringPopup = () => {
  return (
    <FilteringContainer>
        <FilteringText>Добавьте ключевые слова для фильтрации новостей по заголовкам, или<br/>
        оставьте список пустым, чтобы получать все новости. <mark>В Telegram-каналах <br/>
        и группах/пабликах VK</mark> поиск осуществляется по всему содержанию.</FilteringText>

        <FilteringKey>
            <FilteringKeyTitle>Ключевые слова</FilteringKeyTitle>
            <FilteringInputContainer>
                <FilteringInput type="text" placeholder="Введите ключевое слово" />
                <FilteringImg src={plus_crimson} alt="plus icon" width={16} height={16}/>
            </FilteringInputContainer>
            <FilteringBlocks>
                <FilteringBlock>Технологии<img src={del} alt="del icon" width={14} height={16}/></FilteringBlock>
                <FilteringBlock>Программирование<img src={del} alt="del icon" width={14} height={16}/></FilteringBlock>
                <FilteringBlock>Деньги<img src={del} alt="del icon" width={14} height={16}/></FilteringBlock>
            </FilteringBlocks>
        </FilteringKey>

        <FilteringText>Добавьте стоп-слова, чтобы исключить нежелательные новости по заголовкам. <br/>
        В Telegram-каналах и группах/пабликах VK стоп-слова применяются<br/> 
        <mark> ко всему содержанию.</mark></FilteringText>

        <FilteringKey>
            <FilteringKeyTitle>стоп-слова</FilteringKeyTitle>
            <FilteringInputContainer>
                <FilteringInput type="text" placeholder="Введите ключевое слово" />
                <FilteringImg src={plus_crimson} alt="plus icon" width={16} height={16}/>
            </FilteringInputContainer>
            <FilteringBlocks>
                <FilteringBlock>Платный<img src={del} alt="del icon" width={14} height={16}/></FilteringBlock>
                <FilteringBlock>Реклама<img src={del} alt="del icon" width={14} height={16}/></FilteringBlock>
                <FilteringBlock>Абстракция<img src={del} alt="del icon" width={14} height={16}/></FilteringBlock>
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
    img {
        cursor: pointer;
    }
`
export default FilteringPopup
