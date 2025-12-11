import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";

const SourcesPopup = () => {
  const { changeContent } = usePopupStore()

  return (
    <div>
      <SourcesText>
        Здесь вы можете добавить источник, откуда сервис<br />
        будет брать посты. Отображается <mark>имя и URL.</mark>
      </SourcesText>

      <SourcesKey>
        <SourcesKeyTitle>Мои источники:</SourcesKeyTitle>
        <InputPlus title="Введите источник" img="blue" />
        <BlocksItems items={['apple.com', 'Citilink.ru', 'dns.shop']} color="#2B89ED" />
      </SourcesKey>
      <SourcesButtons>
        <BtnBase $margin="40" onClick={() => changeContent("compilation")} $color="#D6DCEC" $bg="#2B89ED">Подборки источников</BtnBase>
        <BtnBase $margin="64">Сохранить</BtnBase>
      </SourcesButtons>
    </div>
  )
}

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
const SourcesButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default SourcesPopup