import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import CheckboxText from "@/shared/CheckboxText";
import CustomSelect from "@/shared/CustomSelect";
import BtnBase from "@/shared/BtnBase";

const LinkGenerationPopup = () => {
  const { goBack } = usePopupStore()
  return (
    <LinkGenerationContainer>
      <LinkGenerationTitle>Настройка ссылки</LinkGenerationTitle>
      <LinkGenerationContent>
        <LinkGenerationItem>
          <ItemTitle>Заявки на вступление</ItemTitle>
          <ItemDesc>Новые подписчики смогут присоединиться к каналу без дополнительной<br /> проверки администраторами.</ItemDesc>
          <CheckboxText
            options={[
              { id: 'on', label: 'Вкл' },
              { id: 'off', label: 'Выкл' }
            ]}
            bg="#336CFF"
          />
        </LinkGenerationItem>
        <LinkGenerationItem>
          <ItemTitle>Название <mark>(необязательное)</mark></ItemTitle>
          <ItemDesc><mark>Название ссылки</mark> будут видеть только администраторы.</ItemDesc>
          <ItemInput type="text" placeholder="Название" />
        </LinkGenerationItem>
        <LinkGenerationItem>
          <ItemTitle>Лимит участников <mark>(необязательное)</mark></ItemTitle>
          <ItemDesc>Максимальное количество пользователей, которые могут присоединиться по этой ссылке</ItemDesc>
          <CustomSelect
            placeholder="Лимит участников"
            options={[
              { value: "Unlimited", label: "Не ограничено" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
            ]}
          />
        </LinkGenerationItem>
        <LinkGenerationItem>
          <ItemTitle>Срок действия</ItemTitle>
          <ItemDesc>Вы можете выбрать срок действия для этой ссылки.</ItemDesc>
          <CheckboxText
            options={[
              { id: 'unlimited', label: 'Без ограничений' },
              { id: '1h', label: '1 час' },
              { id: '1d', label: '1 день' },
              { id: '1w', label: '1 нед.' },
              { id: 'other', label: 'Другой' },
            ]}
            bg="#FC5B5B"
          />
        </LinkGenerationItem>
      </LinkGenerationContent>
      <LinkGenerationButtons>
        <BtnBase $color="#D6DCEC" $bg="#336CFF">Создать ссылку</BtnBase>
        <BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
      </LinkGenerationButtons>
    </LinkGenerationContainer>
  )
}
const LinkGenerationContainer = styled.div`

`
const LinkGenerationTitle = styled.h2`
  color: #6A7080;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 32px;
`
const LinkGenerationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`
const LinkGenerationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const ItemTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;

  mark {
    color: #6A7080;
  }
`
const ItemDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;

  mark {
    color: #FC5B5B;
  }
`
const ItemInput = styled.input`
  box-sizing: border-box;
  border: 2px solid #333E59;
  border-radius: 12px;
  background-color: transparent;
  max-width: 582px;
  width: 100%;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  color: #D6DCEC;
  
  &::placeholder {
    color: #D6DCEC;
  }
`
const LinkGenerationButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 32px;
`

export default LinkGenerationPopup
