import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import Drag from "@/shared/Drag";
import BtnBase from "@/shared/BtnBase";
import { useChannelGlobalPrompt } from "@/lib/channels/global-prompt/useChannelGlobalPrompt";
import { useGetChannelCreativity } from "@/lib/channels/creativity/useGetChannelCreativity";
import { useGetChannelCaption } from "@/lib/channels/caption/useGetChannelCaption";
import { useUpdateChannelGlobalPrompt } from "@/lib/channels/global-prompt/useUpdateChannelGlobalPrompt";
import { useUpdateChannelCreativity } from "@/lib/channels/creativity/useUpdateChannelCreativity";
import { useUpdateChannelCaption } from "@/lib/channels/caption/useUpdateChannelCaption";
import Preview from "@/components/Preview";
import { useTestDrivePrompt } from "@/lib/posts/useTestDrivePrompt";

const IndustrialStylePopup = () => {
  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const telegramId = popup?.data?.telegramId;

  const [collapsed, setCollapsed] = useState(false);
  const [result, setResult] = useState(null);
  const [localPrompt, setLocalPrompt] = useState("");
  const [localCaption, setLocalCaption] = useState("");
  const [localCreativity, setLocalCreativity] = useState(0);

  const { globalPrompt } = useChannelGlobalPrompt(channelId);
  const { creativity } = useGetChannelCreativity(channelId);
  const { caption } = useGetChannelCaption(channelId);

  const { mutateAsync: testDrive, isLoading } = useTestDrivePrompt();

  useEffect(() => {
    if (globalPrompt !== undefined) setLocalPrompt(globalPrompt.globalPromt);
    if (caption !== undefined) setLocalCaption(caption.caption);
    if (creativity !== undefined) setLocalCreativity(creativity.creativity);
  }, [globalPrompt, caption, creativity]);

  const handlePromptChange = (e) => {
    if (e.target.value.length <= MAX_PROMPT_LENGTH) {
      setLocalPrompt(e.target.value);
    }
  };
  const handleTest = async () => {
    const data = await testDrive({
      topic: "Спорт",
      promtManage: localPrompt,
      channelId,
    });
    setResult(data);
  };

  const { mutate: updateGlobalPrompt } = useUpdateChannelGlobalPrompt();
  const { mutate: updateCreativity } = useUpdateChannelCreativity();
  const { mutate: updateCaption } = useUpdateChannelCaption();

  const handleSave = () => {
    updateGlobalPrompt({ channelId, value: localPrompt });
    updateCreativity({ channelId, value: localCreativity });
    updateCaption({ channelId, value: localCaption });
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
                value={localPrompt}
                onChange={handlePromptChange}
              ></textarea>
            </div>
            <button
              disabled={!localPrompt?.trim() || isLoading}
              onClick={handleTest}
            >
              {isLoading ? "Тестируем..." : "Тест"}
            </button>
          </IndustrialStyleInfo>
          <IndustrialStyleDesc>Введите промпт — это задание для генерации поста. <mark>Чем точнее формулировка, тем лучше результат.</mark></IndustrialStyleDesc>
          <IndustrialStyleTitle>Подпись</IndustrialStyleTitle>
          <IndustrialStyleInputContainer>
            <IndustrialStyleInput
              type="text"
              placeholder="Описание канала"
              value={localCaption}
              onChange={(e) => setLocalCaption(e.target.value)}
            />
          </IndustrialStyleInputContainer>
          <IndustrialStyleDesc>Подпись будет добавлена в <mark>конец каждого поста.</mark> Например: ссылка или призыв подписаться.</IndustrialStyleDesc>
        </IndustrialStyleLeft>
        <IndustrialStyleRight>
          <Preview collapsed={collapsed} onChange={() => setCollapsed(!collapsed)} testResult={result} telegramId={telegramId}/>
        </IndustrialStyleRight>
      </IndustrialStyleContent>
      <IndustrialStyleTitle>Креативность</IndustrialStyleTitle>
      <IndustrialStyleBlock>
        <Drag
          value={localCreativity}
          onChange={setLocalCreativity}
        />
        <IndustrialStyleDesc>Ползунок <mark>«Креативность»</mark> регулирует, насколько
          оригинальным и неожиданным будет текст поста.
          Высокие значения <mark>увеличивают</mark> вариативность, что
          может привести к менее предсказуемым результатам
        </IndustrialStyleDesc>
      </IndustrialStyleBlock>
      <IndustrialStyleButton>
        <BtnBase onClick={handleSave}>Сохранить</BtnBase>
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
  margin-bottom: 42px;
  gap: 100px;
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

`
const IndustrialStyleTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
  text-transform: uppercase;
  margin-bottom: 24px;
`
const IndustrialStyleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 991px) {
		flex-direction: column;
    align-items: flex-start;
	}
`

const IndustrialStyleDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  color: #6A7080;
  max-width: 420px;
  margin-top: 24px;

  mark {
    color: #FF7F48;
  }
`
const IndustrialStyleInfo = styled.div`
  position: relative;
  width: 470px;


  div {
    background-color: #1C2336;
    box-sizing: border-box;
    padding: 32px;
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
const IndustrialStyleRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`
const IndustrialStyleButton = styled.div`
  margin-top: 64px;

  @media(max-width: 480px) {
    margin-top: 40px;
  }
`

export default IndustrialStylePopup