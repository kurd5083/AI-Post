import { useState, useEffect } from "react";
import styled from "styled-components";
import ToggleSwitch from "@/shared/ToggleSwitch";
import Counter from "@/shared/Counter";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useCreateConfigСhannel } from "@/lib/channels/promotion/useCreateConfigСhannel";
import { useGetChannelPromotionConfig } from "@/lib/channels/promotion/useGetChannelPromotionConfig";
import { useUpdatePromotionConfig } from "@/lib/channels/promotion/useUpdatePromotionConfig";
import { useCreatePromotionOrders } from "@/lib/channels/promotion/useCreatePromotionOrders";
import del from "@/assets/del.svg";
import ModernLoading from "@/components/ModernLoading";
import { useNotificationStore } from "@/store/notificationStore";

const MAX_POSTS = 10;

const PromotionPopup = () => {
  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { promotionConfig, promotionLoading } = useGetChannelPromotionConfig(channelId);
  const { addNotification } = useNotificationStore();

  const { mutate: createConfigChannel, isPending: createConfigPending } = useCreateConfigСhannel();
  const { mutate: updatePromotionConfig, isPending: updatePromotionPending } = useUpdatePromotionConfig();
  const { mutate: createPromotionOrders, isPending: creatingOrdersPending } = useCreatePromotionOrders();

  const [autoViews, setAutoViews] = useState(false);
  const [autoViewsLink, setAutoViewsLink] = useState(false);
  const [minViews, setMinViews] = useState("");
  const [maxViews, setMaxViews] = useState("");

  const [postLink, setPostLink] = useState("");
  const [postQuantity, setPostQuantity] = useState("");
  const [manualPosts, setManualPosts] = useState([]);

  const [pendingAutoViews, setPendingAutoViews] = useState(false);
  const [pendingAutoViewsLink, setPendingAutoViewsLink] = useState(false);

  useEffect(() => {
    if (promotionConfig) {
      setAutoViews(promotionConfig.isEnabled || false);
      setAutoViewsLink(promotionConfig.viewsOnNewPostEnabled || false);
      setMinViews(promotionConfig.minViews || "");
      setMaxViews(promotionConfig.maxViews || "");
    }
  }, [promotionConfig]);

  const handleSaveConfig = () => {
    if (autoViews) {
      if (!minViews || !maxViews) {
        return addNotification("Укажите минимальное и максимальное количество просмотров для автозакупки", "error");
      }
      if (Number(minViews) > Number(maxViews)) {
        return addNotification("Минимальные просмотры не могут быть больше максимальных", "error");
      }
    }

    const payload = {
      isEnabled: autoViews,
      allowedServiceIds: [272],
      viewsOnNewPostEnabled: autoViewsLink,
      boostsEnabled: false,
      boostsRetentionDays: 7,
      minViews,
      maxViews,
    };

    const mutateFn = promotionConfig?.id ? updatePromotionConfig : createConfigChannel;

    mutateFn(
      promotionConfig?.id ? { channelId, payload } : { channelId, ...payload },
      {
        onSuccess: () => {
          addNotification(
            promotionConfig?.id ? "Настройки продвижения успешно обновлены" : "Настройки продвижения успешно созданы",
            "update"
          );
        },
        onError: (err) => {
          addNotification(err?.message || "Недостаточно прав для изменения настроек", "error");
        }
      }
    );
  };

  const handleAddPost = () => {
    const quantityNumber = Number(postQuantity);

    if (!postLink) return addNotification("Введите ссылку на пост", "error");
    if (!postQuantity) return addNotification("Укажите количество просмотров", "error");
    if (quantityNumber < 10 || quantityNumber > 300000)
      return addNotification("Количество просмотров должно быть от 10 до 300 000", "error");
    if (manualPosts.length >= MAX_POSTS) return addNotification(`Максимум ${MAX_POSTS} постов можно добавить`, "error");

    setManualPosts(prev => [
      ...prev,
      { link: postLink, quantity: quantityNumber }
    ]);

    setPostLink("");
    setPostQuantity("");
  };

  const handlePromotePosts = () => {
    let postsToPromote = [...manualPosts];
    if (!postsToPromote.length && postLink && postQuantity) {
      postsToPromote.push({ link: postLink, quantity: Number(postQuantity) });
    }

    if (!postsToPromote.length)
      return addNotification("Сначала добавьте хотя бы один пост для продвижения", "error");

    const orders = postsToPromote.map(post => ({
      link: post.link,
      username: popup?.data?.channelUsername || "",
      quantity: Number(post.quantity),
    }));

    createPromotionOrders(
      {
        channelId: channelId,
        orders: orders
      },
      {
        onSuccess: () => {
          addNotification("Заказы успешно созданы", "success");
          setManualPosts([]);
          setPostLink("");
          setPostQuantity("");
        },
        onError: (err) => addNotification(err?.message || "Недостаточно прав для создания заказов", "error")
      }
    );
  };

  const toggleAutoViews = () => {
    setPendingAutoViews(true);
    updatePromotionConfig(
      { channelId, payload: { isEnabled: !autoViews } },
      {
        onSuccess: () => setAutoViews(!autoViews),
        onError: (err) => addNotification(err?.message || "Недостаточно прав для изменения автозакупки", "error"),
        onSettled: () => setPendingAutoViews(false)
      }
    );
  };

  const toggleAutoViewsLink = () => {
    setPendingAutoViewsLink(true);
    updatePromotionConfig(
      { channelId, payload: { viewsOnNewPostEnabled: !autoViewsLink } },
      {
        onSuccess: () => setAutoViewsLink(!autoViewsLink),
        onError: (err) => addNotification(err?.message || "Недостаточно прав для изменения просмотров по ссылке", "error"),
        onSettled: () => setPendingAutoViewsLink(false)
      }
    );
  };

  return (
    <PromotionContainer>
      <PromotionHead>
        <PromotionHeadText $active={true}>Просмотр</PromotionHeadText>
        <PromotionHeadText onClick={() => changeContent("boosts")}>Бусты</PromotionHeadText>
        <PromotionHeadText onClick={() => changeContent("my_orders")}>Мои заказы</PromotionHeadText>
      </PromotionHead>

      {promotionLoading ? (
        <ModernLoading text="Загрузка публикаций..." />
      ) : (
        <>
          <PromotionViews>
            <ToggleSwitch
              bg="#EF6283"
              checked={autoViews}
              onChange={toggleAutoViews}
              disabled={pendingAutoViews || createConfigPending || updatePromotionPending}
            />
            <PostTitle>
              Просмотры на новый пост<br /> и автозакупка после публикации
            </PostTitle>
          </PromotionViews>

          <PromotionViews>
            <ToggleSwitch
              bg="#EF6283"
              checked={autoViewsLink}
              onChange={toggleAutoViewsLink}
              disabled={pendingAutoViewsLink || createConfigPending || updatePromotionPending}
            />
            <PostTitle>
              Просмотры на пост по ссылке
            </PostTitle>
          </PromotionViews>

          {autoViews && (
            <ViewsPost>
              <PostTitle>Просмотры на пост</PostTitle>
              <PostContainer>
                <Counter placeholder="Мин." value={minViews} onChange={setMinViews} disabled={updatePromotionPending || createConfigPending} />
                <Counter placeholder="Макс." value={maxViews} onChange={setMaxViews} disabled={updatePromotionPending || createConfigPending} />
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
                      disabled={creatingOrdersPending}
                    />
                  </CounterContainer>
                  <CounterContainer>
                    <CounterTitle>Количество просмотров:</CounterTitle>
                    <Counter
                      value={post.quantity}
                      onChange={(value) => {
                        const newPosts = [...manualPosts];
                        newPosts[index].quantity = value;
                        setManualPosts(newPosts);
                      }}
                      disabled={creatingOrdersPending}
                    />
                  </CounterContainer>

                  {manualPosts.length > 1 && (
                    <ButtonDel
                      onClick={() => setManualPosts(prev => prev.filter((_, i) => i !== index))}
                      title="Удалить"
                      disabled={creatingOrdersPending}
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
                    disabled={creatingOrdersPending}
                  />
                </CounterContainer>
                <CounterContainer>
                  <CounterTitle>Количество просмотров:</CounterTitle>
                  <Counter value={postQuantity} onChange={setPostQuantity} disabled={creatingOrdersPending} />
                </CounterContainer>

                <BtnBase
                  $padding="17px 31px"
                  $color="#fff"
                  $bg="#336CFF"
                  onClick={handleAddPost}
                  disabled={!postLink || !postQuantity || creatingOrdersPending}
                >
                  + Добавить ссылку на пост
                </BtnBase>
              </PostContainer>

              <BtnBase
                $margin="8"
                $padding="21px 24px"
                $color="#EF6284"
                $bg="#241F31"
                onClick={handlePromotePosts}
                disabled={creatingOrdersPending}
              >
                {creatingOrdersPending ? "Продвигаем..." : "Начать продвижение"}
              </BtnBase>
            </PromotePost>
          )}
        </>
      )}

      <BtnBase
        $margin="64"
        onClick={handleSaveConfig}
        disabled={createConfigPending || updatePromotionPending}
      >
        {createConfigPending || updatePromotionPending ? "Сохраняем..." : "Сохранить"}
      </BtnBase>
    </PromotionContainer>
  );
};


const PromotionContainer = styled.div`
  padding: 0 56px 30px;
  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }
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
const PostContainer = styled.div` display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;`;
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
  border: 2px solid #2F3953;
  &:hover { border: none; background-color: rgba(239, 98, 132, 0.08); }
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
  &::placeholder { color: #D6DCEC; }
  @media(max-width: 480px) { font-size: 16px; }
`;

export default PromotionPopup;