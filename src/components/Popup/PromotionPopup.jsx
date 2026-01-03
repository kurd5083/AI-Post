import { useState, useEffect } from "react";
import styled from "styled-components";
import ToggleSwitch from "@/shared/ToggleSwitch";
import Counter from "@/shared/Counter";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useCreateConfigСhannel } from "@/lib/channels/promotion/useCreateConfigСhannel";
import { useGetChannelPromotionConfig } from "@/lib/channels/promotion/useGetChannelPromotionConfig";
import { useUpdatePromotionConfig } from "@/lib/channels/promotion/useUpdatePromotionConfig";
import del from "@/assets/del.svg";
import ModernLoading from "@/components/ModernLoading";

const PromotionPopup = () => {
  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { promotionConfig, promotionLoading } = useGetChannelPromotionConfig(channelId);
  const { mutate: createConfigСhannel, isLoading: createConfigLoading } = useCreateConfigСhannel();
  const { mutate: updatePromotionConfig, isLoading: updatePromotionLoading } = useUpdatePromotionConfig();

  const [autoViews, setAutoViews] = useState(false);
  const [autoViewsLink, setAutoViewsLink] = useState(false);
  const [minViews, setMinViews] = useState("");
  const [maxViews, setMaxViews] = useState("");

  const [postLink, setPostLink] = useState("");
  const [postViews, setPostViews] = useState("");
  const [manualPosts, setManualPosts] = useState([]);

  useEffect(() => {
    if (promotionConfig) {
      setAutoViews(promotionConfig.isEnabled || false);
      setAutoViewsLink(promotionConfig.viewsOnNewPostEnabled || false);
      setMinViews(promotionConfig.minViews);
      setMaxViews(promotionConfig.maxViews);
    }
  }, [promotionConfig]);
  console.log(promotionConfig, 'promotionConfig')

  const handleAddPost = () => {
    if (!postLink || !postViews) return;
    if (manualPosts.length >= 10) return;
    setManualPosts(prev => [...prev, { link: postLink, minViews, maxViews }]);
    setPostLink("");
    setMinViews("");
    setMaxViews("");
  };
  const buildPayload = () => ({
    isEnabled: autoViews,
    allowedServiceIds: [272],
    viewsOnNewPostEnabled: autoViewsLink,
    boostsEnabled: false,
    boostsRetentionDays: 7,
    minViews,
    maxViews,
  });
  const handleSave = () => {
    const payload = buildPayload();

    if (promotionConfig) {
      updatePromotionConfig({ channelId, payload });
    } else {
      createConfigСhannel({ channelId, ...payload });
    }
  };

  return (
    <PromotionContainer>
      <PromotionHead>
        <PromotionHeadText $active={true}>Просмотр</PromotionHeadText>
        <PromotionHeadText onClick={() => changeContent("boosts")}>Бусты</PromotionHeadText>
      </PromotionHead>
      {promotionLoading ? (
        <ModernLoading text="Загрузка публикаций..." />
      ) : (
        <>
          <PromotionViews>
            <ToggleSwitch bg="#EF6283" checked={autoViews} onChange={() => setAutoViews(!autoViews)} />
            <PostTitle>
              Просмотры на новый пост<br /> и автозакупка после публикации
            </PostTitle>
          </PromotionViews>
          <PromotionViews>
            <ToggleSwitch bg="#EF6283" checked={autoViewsLink} onChange={() => setAutoViewsLink(!autoViewsLink)} />
            <PostTitle>
              Просмотры на пост по ссылке
            </PostTitle>
          </PromotionViews>

          {autoViews && (
            <ViewsPost>
              <PostTitle>Просмотры на пост</PostTitle>
              <PostContainer>
                <Counter placeholder="Мин." value={minViews} onChange={setMinViews} />
                <Counter placeholder="Макс." value={maxViews} onChange={setMaxViews} />
              </PostContainer>
            </ViewsPost>
          )}
          {autoViewsLink && (
            <PromotePost>
              <PostTitle>Продвинуть пост</PostTitle>
              <PromoteText>
                Введите ссылку на пост и количество просмотров для ручного продвижения
              </PromoteText>
              {manualPosts.map((post, index) => (
                <PostContainer key={index}>
                  <CounterContainer>
                    <CounterTitle>Ссылка на пост:</CounterTitle>
                    <PostInput
                      value={post.link}
                      onChange={(e) => {
                        const newPosts = [...manualPosts];
                        newPosts[index].link = e.target.value;
                        setManualPosts(newPosts);
                      }}
                    />
                  </CounterContainer>
                  <CounterContainer>
                    <CounterTitle>Мин. просмотры:</CounterTitle>
                    <Counter
                      value={post.minViews || ""}
                      onChange={(value) => {
                        const newPosts = [...manualPosts];
                        newPosts[index].minViews = value;
                        setManualPosts(newPosts);
                      }}
                    />
                  </CounterContainer>

                  <CounterContainer>
                    <CounterTitle>Макс. просмотры:</CounterTitle>
                    <Counter
                      value={post.maxViews || ""}
                      onChange={(value) => {
                        const newPosts = [...manualPosts];
                        newPosts[index].maxViews = value;
                        setManualPosts(newPosts);
                      }}
                    />
                  </CounterContainer>
                  {manualPosts.length <= 1 ? null : (
                    <ButtonDel
                      onClick={() => setManualPosts((prev) => prev.filter((_, i) => i !== index))}
                      title="Удалить"
                    >
                      <img src={del} alt="del icon" width={14} height={16} />
                    </ButtonDel>
                  )}
                </PostContainer>
              ))}

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
                  <CounterTitle>Мин. просмотры:</CounterTitle>
                  <Counter value={minViews} onChange={setMinViews} />
                </CounterContainer>

                <CounterContainer>
                  <CounterTitle>Макс. просмотры:</CounterTitle>
                  <Counter value={maxViews} onChange={setMaxViews} />
                </CounterContainer>

                <BtnBase
                  $padding="17px 31px"
                  $color="#fff"
                  $bg="#336CFF"
                  onClick={handleAddPost}
                  disabled={!postLink || !minViews || !maxViews}
                >
                  + Добавить ссылку на пост
                </BtnBase>
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
          )}
        </>
      )}

      <BtnBase
        $margin="64"
        onClick={handleSave}
        disabled={
          createConfigLoading || updatePromotionLoading
        }
      >
        {createConfigLoading || updatePromotionLoading
          ? "Сохраняем..."
          : "Сохранить"}
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
const PostContainer = styled.div` display: flex; gap: 16px; align-items: flex-end;`;
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

const ButtonDel = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
  margin-right: 8px;
  
  @media (max-width: 480px) {
    margin-right: 4px !important;
    width: 40px;
    height: 40px;
  }
  border: 2px solid #2F3953;

  margin-right: 0;
  
  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
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
