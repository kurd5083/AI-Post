import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import Drag from "@/shared/Drag";
import BtnBase from "@/shared/BtnBase";
import PlusIcon from "@/icons/PlusIcon";

const MAX_PROMPT_LENGTH = 100;

const IndustrialStylePopup = () => {
  const { changeContent } = usePopupStore()
  const [prompt, setPrompt] = useState("");
  const handlePromptChange = (e) => {
    if (e.target.value.length <= MAX_PROMPT_LENGTH) {
      setPrompt(e.target.value);
    }
  };
  const handleTest = () => {
    if (!prompt.trim()) return;
    console.log("Тестирование промпта:", prompt);
  };
  return (
    <IndustrialStyleContainer>
      <IndustrialStyleContent>
        <IndustrialStyleLeft>
          <BtnBase onClick={() => changeContent("industrial_library")} $color="#D6DCEC" $bg="#2B89ED">Библиотека промптов</BtnBase>
          <IndustrialStyleTitle>Промпт</IndustrialStyleTitle>
          <IndustrialStyleInfo>
            <div>
              <textarea
                placeholder="Введите промпт..."
                value={prompt}
                onChange={handlePromptChange}
              ></textarea>
            </div>
            <button
              disabled={!prompt.trim()}
              onClick={handleTest}
            >
              Тест
            </button>
            <p>{prompt.length} / {MAX_PROMPT_LENGTH}</p>
          </IndustrialStyleInfo>
          <IndustrialStyleDesc>Введите промпт — это задание для генерации поста. <mark>Чем точнее формулировка, тем лучше результат.</mark></IndustrialStyleDesc>
          <IndustrialStyleTitle>Подпись</IndustrialStyleTitle>
          <IndustrialStyleInputContainer>
            <IndustrialStyleInput type="text" placeholder="Описание канала" />
            <IndustrialStyleBtn>
              <PlusIcon color="#2B89ED"/>
            </IndustrialStyleBtn>
          </IndustrialStyleInputContainer>
          <IndustrialStyleDesc>Подпись будет добавлена в <mark>конец каждого поста.</mark> Например: ссылка или призыв подписаться.</IndustrialStyleDesc>
        </IndustrialStyleLeft>
        <IndustrialStyleRight>
          <IndustrialStyleTitle>Креативность</IndustrialStyleTitle>
          <Drag />
          <IndustrialStyleDesc>Ползунок <mark>«Креативность»</mark> регулирует, насколько
            оригинальным и неожиданным будет текст поста.
            Высокие значения <mark>увеличивают</mark> вариативность, что
            может привести к менее предсказуемым результатам</IndustrialStyleDesc>
        </IndustrialStyleRight>
      </IndustrialStyleContent>
      <IndustrialStyleButton>
        <BtnBase>Сохранить</BtnBase>
      </IndustrialStyleButton>
    </IndustrialStyleContainer>
  )
}
const IndustrialStyleContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const IndustrialStyleContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 80px;
`
const IndustrialStyleLeft = styled.div`
  h2 {
    margin-top: 40px;
    
    @media (max-width: 480px) {
			margin-top: 32px;
		}
  }
`
const IndustrialStyleInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
const IndustrialStyleTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
  text-transform: uppercase;
  margin-bottom: 24px;
`
const IndustrialStyleDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  color: #6A7080;
  margin-top: 24px;
  max-width: 420px;

  mark {
    color: #FF7F48;
  }
`
const IndustrialStyleInfo = styled.div`
  position: relative;

  div {
    background-color: #1C2336;
    box-sizing: border-box;
    padding: 32px;
    width: 470px;
    border-radius: 24px;
    min-height: 170px;
		@media (max-width: 768px) {
			width: 100%;
		}
    @media (max-width: 480px) {
			padding: 24px;
		}
    &::placeholder {
      color: #6A7080;
    }
  }
  textarea {
    background-color: #1C2336;
    border: none;
    outline: none;
    color: #6A7080;
    resize: none;
    width: 100%;
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
    scrollbar-width: none;
  }
  button {
    position: absolute;
    bottom: 32px;
    left: 32px;
    padding: 10px 24px 12px;
    font-size: 14px;
    font-weight: 700;
    color: #D6DCEC;
    border-radius: 12px;
    border: 2px solid #333E59;

    @media (max-width: 480px) {
			bottom: 24px;
      left: 24px;
		}
  }
  p {
    position: absolute;
    bottom: 44px;
    right: 32px;
    font-size: 12px;
    font-weight: 700;
    @media (max-width: 480px) {
			bottom: 36px;
      right: 24px;
		}
  }
`

const IndustrialStyleInput = styled.input`
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
const IndustrialStyleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #162238;
  border-radius: 50%;
`
const IndustrialStyleRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const IndustrialStyleButton = styled.div`
  margin-top: 64px;

  @media(max-width: 480px) {
    margin-top: 40px;
  }
`

export default IndustrialStylePopup