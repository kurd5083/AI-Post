import styled from "styled-components";
import plus_blue from "@/assets/popup/plus-blue.svg";
import del from "@/assets/popup/del.svg";

const SourcesPopup = () => {
  return (
    <SourcesContainer>
      <SourcesText>
        Здесь вы можете добавить источник, откуда сервис<br />
        будет брать посты. Отображается <mark>имя и URL.</mark>
      </SourcesText>

      <SourcesKey>
      <SourcesKeyTitle>Мои источники:</SourcesKeyTitle>
        <SourcesKeySubitle>Введите источник</SourcesKeySubitle>
        <SourcesInputContainer>
          <SourcesInput type="text"/>
          <SourcesImg src={plus_blue} alt="plus icon" width={16} height={16} />
        </SourcesInputContainer>
        <SourcesBlocks>
          <SourcesBlock>apple.com<img src={del} alt="del icon" width={14} height={16} /></SourcesBlock>
          <SourcesBlock>Citilink.ru<img src={del} alt="del icon" width={14} height={16} /></SourcesBlock>
          <SourcesBlock>dns.shop<img src={del} alt="del icon" width={14} height={16} /></SourcesBlock>
        </SourcesBlocks>
      </SourcesKey>
      <SourcesButton>Подборки источников</SourcesButton>
    </SourcesContainer>
  )
}
const SourcesContainer = styled.div`
    
`
const SourcesText = styled.p`
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
const SourcesKey = styled.div`
    margin-top: 40px;
`
const SourcesKeyTitle = styled.h2`
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 40px;
`
const SourcesKeySubitle = styled.h3`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    color: #6A7080;
    margin-bottom: 26px;
`
const SourcesInputContainer = styled.div`
    display: flex;
    gap: 24px;
`
const SourcesInput = styled.input`
    background-color: transparent;
    max-width: 280px;
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
const SourcesImg = styled.img`
    padding: 12px;
    background-color: #142036;
    border-radius: 50%;
    cursor: pointer;
`
const SourcesBlocks = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 32px;
`
const SourcesBlock = styled.p`
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
const SourcesButton = styled.button`
    padding: 21px 24px;
    border-radius: 12px;
    color: #D6DCEC;
    background-color: #2B89ED;
    font-weight: 700;
    font-size: 14px;
    margin-top: 40px;
`
export default SourcesPopup
