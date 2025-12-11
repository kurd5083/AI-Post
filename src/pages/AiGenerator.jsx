import styled from "styled-components";
import create from "@/assets/create.svg";
import BtnBase from "@/shared/BtnBase";
import del from "@/assets/del.svg";
import hide from "@/assets/hide.svg";
import paper from "@/assets/ai-generator/paper.svg";
import img from "@/assets/ai-generator/img.svg";
import comment from "@/assets/ai-generator/comment.svg";
import map from "@/assets/ai-generator/map.svg";
import text from "@/assets/ai-generator/text.svg";
import setting from "@/assets/ai-generator/setting.svg";
import ellipsis from "@/assets/ai-generator/ellipsis.svg";
import eye_blue from "@/assets/eye-blue.svg";
import publish from "@/assets/ai-generator/publish.svg";
import PreviewBG from "@/assets/ai-generator/PreviewBG.png";
import copy from "@/assets/copy.svg";
import CheckboxCircle from "@/shared/CheckboxCircle";
import CustomSelect from "@/shared/CustomSelectSec";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";

const AiGenerator = () => {
  const posts = [
    {
      id: 1,
      title: "Пост 1",
      progress: "325 / 1029",
      text: "Текст публикации о новых технологиях в маркетинге..."
    },
    {
      id: 2,
      title: "Пост 2",
      progress: "780 / 1500",
      text: "Аналитика продаж за последний квартал показывает рост на 15%..."
    },
    {
      id: 3,
      title: "Пост 3",
      progress: "1024 / 1024",
      text: "Новый продукт компании: революционный подход к автоматизации..."
    },
    {
      id: 4,
      title: "Пост 4",
      progress: "128 / 500",
      text: "Отзывы клиентов о нашем сервисе и планы на будущее развитие..."
    }
  ];

  return (
    <GeneratorContainer>
      <GeneratorHead>
        <h2>
          <AiGeneratorIcon width={24} height={24}/>
          AI Генератор
        </h2>
        <BtnBase $padding="21px 24px">
          + Добавить пост
        </BtnBase>
      </GeneratorHead>
      <GeneratorList>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ItemHead>
              <CheckboxCircle><h3>{post.title}</h3></CheckboxCircle>
              <p>{post.progress}</p>
            </ItemHead>
            <ItemText>{post.text}</ItemText>
            <ItemAI>
              <p><img src={create} alt="create icon" />Создать фото с AI</p>
              <p><AiGeneratorIcon width={24} height={24}/>Написать с AI</p>
            </ItemAI>
            <ItemActions>
              <ItemActionsAdd>
                <AiGeneratorIcon width={24} height={24}/>
                <img src={paper} alt="paper icon" width={14} height={16} />
                <img src={img} alt="img icon" width={16} height={16} />
                <img src={comment} alt="comment icon" width={16} height={16} />
                <img src={map} alt="map icon" width={18} height={20} />
                <img src={text} alt="text icon" width={18} height={20} />
                <img src={setting} alt="setting icon" width={18} height={20} />
                <img src={ellipsis} alt="ellipsis icon" width={18} height={4} />
              </ItemActionsAdd>
              <Buttons>
                <HideButton>
                  <img src={hide} alt="hide icon" width={24} height={17} />
                </HideButton>
                <DeleteButton>
                  <img src={del} alt="del icon" width={14} height={16} />
                </DeleteButton>
                <BtnBase $padding="19px 46px">
                  Сохранить
                </BtnBase>
              </Buttons>
            </ItemActions>
          </ListItem>
        ))}
      </GeneratorList>
      <GeneratorPreview>
        <PreviewContent>
          <PreviewHead><img src={eye_blue} alt="eye icon" />Лайв превью</PreviewHead>
          <PreviewSelect>
            <CustomSelect
              placeholder="Все платформы"
              options={[
                { value: "Telegram", label: "Telegram" },
              ]}
              width="220px"
              fs="14px"
            />
            <BtnBase $padding="16px 24px">Telegram</BtnBase>
          </PreviewSelect>
          <PreviewInfo>
            <PreviewInfoBG src={PreviewBG} alt="bg" />
            <PreviewInfoContent>
              <PreviewInfoText>
                🎯 Breaking: Sustainable<br /><br />
                Technology reaches new milestone! We're
                excited to share this incredible
                achievement with our community. This
                wouldn't be possible without your continued
                support and feedback.<br /><br />
                🔥 What's next? • Enhanced features • Expanded
                capabilities • Even better user experience Stay
                tuned for more updates! 🚀
              </PreviewInfoText>
              <BtnBase $padding="17px" $bg="#243D56" $color="#D6DCEC">🚀 Начать</BtnBase>
            </PreviewInfoContent>
          </PreviewInfo>
          <PreviewButtons>
            <ButtonBlock>
              <PreviewButton><img src={text} alt="text icon" width={24} height={17} /></PreviewButton>
              <p>EDIT TEXT</p>
            </ButtonBlock>
            <ButtonBlock>
              <PreviewButton><img src={img} alt="img icon" width={14} height={16} /></PreviewButton>
              <p>EDIT IMAGE</p>
            </ButtonBlock>
            <ButtonBlock>
              <PreviewButton><img src={copy} alt="copy icon" width={24} height={17} /></PreviewButton>
              <p>COPY TEXT</p>
            </ButtonBlock>
          </PreviewButtons>
        </PreviewContent>
        <PreviewPublish>
          <BtnBase $padding="32px" $bg="#336CFF" $color="#D6DCEC">
            <img src={publish} alt="publish icon" />
            Опубликовать записи
          </BtnBase>
        </PreviewPublish>
      </GeneratorPreview>
    </GeneratorContainer>
  );
};
const GeneratorContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 120px auto;
  gap: 16px;
  padding: 0 24px;
  margin-top: 50px;
`;
const GeneratorHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  background-color: #181E30;
  border-radius: 24px;
  grid-column: span 3 / span 3;
  h2 {
    display: flex;
    align-items: center;
    gap: 22px;
    font-size: 24px;
    font-weight: 800;
    margin: 0;
  }
`;
const GeneratorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  grid-column: span 3 / span 3;
  overflow-y: auto;
  scrollbar-width: none;
  max-height: calc(100vh - 240px);
`;
const ListItem = styled.div`
  padding: 32px;
  border-radius: 24px;
  border: 2px solid #252D43;
`
const ItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
  }
  p {
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
  }
`
const PreviewSelect = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PreviewInfo = styled.div`
  position: relative;
  margin-top: 32px;
`
const PreviewInfoBG = styled.img`
  border-radius: 24px;
  width: 100%;
  max-height: 320px;
  height: auto;
  object-fit: cover;
`
const PreviewInfoContent = styled.div`
  width: calc(100% - 104px);
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  top: 23px;
  left: 52px;
  button {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
const PreviewInfoText = styled.p`
  box-sizing: border-box;
  padding: 24px;
  background-color: #131C22;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
`
const ItemText = styled.p`
  color: #6A7080;
  font-size: 16px;
  font-weight: 700;
  margin-top: 24px;
`
const ItemAI = styled.div`
  display: flex;
  align-items: center;  
  gap: 40px;
  margin-top: 32px;
  p {
    display: flex;
    align-items: center;  
    gap: 16px;
    font-weight: 700;
    font-size: 14px;
    &:first-child {
      color: #FF7F48;
    }
    &:last-child {
      color: #336CFF;
    }
  }
`
const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const ItemActionsAdd = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  img {
    cursor: pointer;
  }
`
const Buttons = styled.div`
  display: flex;
  gap: 16px;
`;
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
`;
const HideButton = styled(BaseButton)`
  border: 2px solid #2D3241;
`;
const DeleteButton = styled(BaseButton)`
  border: 2px solid #2D3241;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`
const GeneratorPreview = styled.div`
  grid-column: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 1;
`;
const PreviewContent = styled.div`
  background-color: #181E30;
  border-radius: 24px;
  padding: 32px;
`;
const PreviewHead = styled.h2`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 800;
`
const PreviewButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 32px;
`;
const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  p {
    color: #6A7080;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const PreviewButton = styled(BaseButton)`
  border: 2px solid #2D3241;
`;

const PreviewPublish = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 800;
  button {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
`

export default AiGenerator;