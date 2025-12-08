import styled from "styled-components";
import plus_blue from "@/assets/popup/plus-blue.svg";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";

const SourcesPopup = () => {
  const { changeContent } = usePopupStore()

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
          <SourcesInput type="text" />
          <SourcesImg src={plus_blue} alt="plus icon" width={16} height={16} />
        </SourcesInputContainer>
        <SourcesBlocks>
          <SourcesBlock>
            apple.com
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
            </svg>
          </SourcesBlock>
          <SourcesBlock>
            Citilink.ru
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
            </svg>
          </SourcesBlock>
          <SourcesBlock>
            dns.shop
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
            </svg>
          </SourcesBlock>
        </SourcesBlocks>
      </SourcesKey>
      <SourcesButtons>
        <BtnBase $margin="40" onClick={() => changeContent("compilation")} $color="#D6DCEC" $bg="#2B89ED">Подборки источников</BtnBase>
        <BtnBase $margin="64">Сохранить</BtnBase>
      </SourcesButtons>
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
  width: max-content;
  color: #D6DCEC;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2E3954;

  @media(max-width: 480px) {
    font-size: 16px;
  }

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
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
`
const SourcesBlock = styled.p`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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
        fill: #2B89ED 
      }
    }
  }  
`
const SourcesButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default SourcesPopup