import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { useLightboxStore } from "@/store/lightboxStore";
import { useApprovePost } from "@/lib/posts/usePostsModeration";
import { useRejectPost } from "@/lib/posts/useRejectPost";
import { useNotificationStore } from "@/store/notificationStore";
import normalizeUrl from "@/lib/normalizeUrl";
import AvaPlug from "@/shared/AvaPlug";

const MAX_VISIBLE_IMAGES = 3;

const CardPablishPremoderation = ({ item, bg, channelId, selectedChannel }) => {
  const { openLightbox } = useLightboxStore();
  const { addNotification } = useNotificationStore();

  const { mutate: approvePostMutation, isPending: isApprovePending } = useApprovePost();
  const { mutate: rejectPostMutation, isPending: isRejectPending } = useRejectPost();

  const handleApprove = () => {
    approvePostMutation(
      { postId: item.id, channelId },
      {
        onSuccess: () => {
          addNotification("Пост одобрен", "success");
        },
        onError: (err) => {
          addNotification(err?.message || "Ошибка при одобрении поста", "error");
        },
      }
    );
  };

  const handleReject = () => {
    rejectPostMutation(
      { postId: item.id, channelId },
      {
        onSuccess: () => {
          addNotification("Пост отклонён", "delete");
        },
        onError: (err) => {
          addNotification(err?.message || "Ошибка при отклонении поста", "error");
        },
      }
    );
  };

  return (
    <CardPablishItem $bg={bg}>
      <CardPablishItemHead>
        <CardPablishItemName>
          {selectedChannel.avatarUrl ? (
            <CardPablishItemImg src={selectedChannel.avatarUrl} alt={selectedChannel.name} />
          ) : (
            <AvaPlug width="32px" height="32px" />
          )}
          <p>{selectedChannel.name}</p>
        </CardPablishItemName>

        <CardPablishItemTime>
          <p>Дата публикации поста: </p>
          <span>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("ru-RU") + " " +
              new Date(item.publishedAt).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })
              : "Дата не указана"}
          </span>
        </CardPablishItemTime>
      </CardPablishItemHead>

      <CardPablishImages>
        {item.images.slice(0, MAX_VISIBLE_IMAGES).map((elem, index) => {
          const isLastVisible = index === MAX_VISIBLE_IMAGES - 1;
          const extraCount = item.images.length - MAX_VISIBLE_IMAGES;

          const src = elem instanceof File || elem instanceof Blob ? URL.createObjectURL(elem) : normalizeUrl(elem);

          return (
            <ImageItemWrapper
              key={index}
              onClick={() =>
                openLightbox({
                  images: item.images.map(img =>
                    img instanceof File || img instanceof Blob ? URL.createObjectURL(img) : normalizeUrl(img)
                  ),
                  initialIndex: index
                })
              }
            >
              <ImageItem src={src} alt={`картинка ${index}`} />
              {isLastVisible && extraCount > 0 && <Overlay>+{extraCount}</Overlay>}
            </ImageItemWrapper>
          );
        })}
      </CardPablishImages>

      <CardPablishText>{item.title}</CardPablishText>
      <CardPablishSubtext dangerouslySetInnerHTML={{ __html: item.summary }} />

      <CardPablishButtons>
        <BtnBase
          $padding="16px 24px"
          $width="100%"
          $bg="transparent"
          $color="#D6DCEC"
          $border
          onClick={handleApprove}
          disabled={isApprovePending || isRejectPending}
        >
          {isApprovePending ? "Одобрение..." : "Принять"}
        </BtnBase>

        <BtnBase
          $padding="16px 24px"
          $width="100%"
          $bg="transparent"
          $color="#D6DCEC"
          $border
          onClick={handleReject}
          disabled={isApprovePending || isRejectPending}
        >
          {isRejectPending ? "Отклонение..." : "Отклонить"}
        </BtnBase>
      </CardPablishButtons>
    </CardPablishItem>
  );
};

const CardPablishItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  border: 2px solid ${({ $bg }) => ($bg ? "#181F30" : "#1F273B")};
  border-radius: 24px;
  background-color: ${({ $bg }) => ($bg ? "#181F30" : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    background-color: #181F30;
    border-color: #181F30;
  }
`;

const CardPablishItemHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardPablishItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 700;
  }
`;

const CardPablishItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const CardPablishItemTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  font-weight: 700;
  span {
    color: #6A7080;
  }
`;

const CardPablishImages = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-grow: 1;
`;

const ImageItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardPablishText = styled.p`
  margin-top: 18px;
  font-size: 14px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardPablishSubtext = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CardPablishButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;

export default CardPablishPremoderation;