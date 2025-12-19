import { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "@/shared/ToggleSwitch";
import Counter from "@/shared/Counter";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useСreateConfigСhannel } from "@/lib/channels/useСreateConfigСhannel";

const PromotionPopup = () => {
  const { popup, changeContent } = usePopupStore();
	const channelId = popup?.data?.channelId;
  const createConfigСhannel = useСreateConfigСhannel();

  const [autoViews, setAutoViews] = useState(false);
  const [minViews, setMinViews] = useState(null);
  const [maxViews, setMaxViews] = useState(null);
  const [postLink, setPostLink] = useState("");
  const [postViews, setPostViews] = useState(null);

  const handleSave = () => {
    createConfigСhannel.mutate({
			channelId: channelId,
      isEnabled: autoViews,
      allowedServiceIds: [272],
      viewsOnNewPostEnabled: autoViews,
      boostsEnabled: false,
      boostsRetentionDays: 7,
      minViews,
      maxViews,
    });
  };

  return (
    <PromotionContainer>
      <PromotionHead>
        <PromotionHeadText $active={true}>Просмотр</PromotionHeadText>
        <PromotionHeadText onClick={() => changeContent("boosts")}>Бусты</PromotionHeadText>
      </PromotionHead>

      <PromotionViews>
        <ToggleSwitch bg="#EF6283" value={autoViews} onChange={() => setAutoViews(!autoViews)} />
        <PostTitle>
          Просмотры на новый пост<br /> и автозакупка после публикации
        </PostTitle>
      </PromotionViews>

      <ViewsPost>
        <PostTitle>Просмотры на пост</PostTitle>
        <PostContainer>
          <Counter placeholder="Мин." value={minViews} onChange={setMinViews} />
          <Counter placeholder="Макс." value={maxViews} onChange={setMaxViews} />
        </PostContainer>
      </ViewsPost>

      <PromotePost>
        <PostTitle>Продвинуть пост</PostTitle>
        <PromoteText>
          Введите ссылку на пост и количество просмотров для ручного продвижения
        </PromoteText>
        <PostContainer>
          <CounterContainer>
            <CounterTitle>Ссылка на пост:</CounterTitle>
            <PostInput
              placeholder="https://"
              value={postLink}
              onChange={(e) => setPostLink(e.target.value)}
            />
          </CounterContainer>
          <CounterContainer>
            <CounterTitle>Количество просмотров</CounterTitle>
            <Counter placeholder="" value={postViews} onChange={setPostViews} />
          </CounterContainer>
        </PostContainer>
        <BtnBase
          $margin="8"
          $padding="21px 24px"
          $color="#EF6284"
          $bg="#241F31"
        >
          Начать продвижение
        </BtnBase>
      </PromotePost>

      <BtnBase 
				$margin="64"
			 	onClick={handleSave}
        disabled={createConfigСhannel.isLoading}
			>
				{createConfigСhannel.isLoading ? "Сохраняем..." : "Сохранить"}
			</BtnBase>
    </PromotionContainer>
  );
};

const PromotionContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
`;
const PromotionHead = styled.div` display: flex; gap: 32px; `;
const PromotionHeadText = styled.p`
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;
  @media(max-width: 480px) { padding-right: 0; }
`;
const PromotionViews = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 40px;
  @media(max-width: 480px) { align-items: flex-start; }
`;
const PostTitle = styled.h2` font-size: 24px; font-weight: 700; `;
const PostContainer = styled.div` display: flex; gap: 16px; `;
const ViewsPost = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media(max-width: 480px) { margin-top: 48px; }
`;
const PromotePost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 64px;
  @media(max-width: 480px) { margin-top: 48px; }
`;
const PromoteText = styled.p`
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #6A7080;
  max-width: 400px;
`;
const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const CounterTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  @media(max-width: 768px) { max-width: 75px; }
`;
const PostInput = styled.input`
  border: 2px solid #333E59;
  border-radius: 12px;
  width: 100%;
  padding: 16px 24px;
  max-width: 280px;
  color: #D6DCEC;
  font-size: 14px;
  font-weight: 700;
  background-color: transparent;
  @media(max-width: 480px) { font-size: 16px; }
  &::placeholder { color: #D6DCEC; }
`;

export default PromotionPopup;