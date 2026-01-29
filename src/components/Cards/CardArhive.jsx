import styled from "styled-components";

import { useLightboxStore } from "@/store/lightboxStore";
import { usePopupStore } from "@/store/popupStore";

import normalizeUrl from "@/lib/normalizeUrl";
import { useDeletePost } from "@/lib/posts/useDeletePost";
import { useUnarchivePost } from "@/lib/posts/useUnarchivePost";

import СhannelPlug from '@/shared/СhannelPlug';
import BtnBase from "@/shared/BtnBase";

import EyeIcon from "@/icons/EyeIcon";
import DelIcon from "@/icons/DelIcon";

const MAX_VISIBLE_IMAGES = 3;

const CardArhive = ({ item, bg, selectedChannel }) => {
  const { openLightbox } = useLightboxStore();
  const { changeContent } = usePopupStore();
  const { mutate: deletePost, isPending: deletePending } = useDeletePost();
  const { mutate: unarchivePost, isPending: isSendPending } = useUnarchivePost();

  return (
    <CardArhiveItem $bg={bg}>
      <CardArhiveItemHead>
        <CardArhiveItemName>
          <СhannelPlug width="32px" height="32px" text={selectedChannel.name} />
          <p>{selectedChannel.name}</p>
        </CardArhiveItemName>
        <CardArhiveItemTime>
          <p>Дата публикации: </p>
          <span>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
              : "Дата не указана"}
          </span>
        </CardArhiveItemTime>
      </CardArhiveItemHead>
      <CardArhiveImages>
        {item.images.slice(0, MAX_VISIBLE_IMAGES).map((elem, index) => {
          const isLastVisible = index === MAX_VISIBLE_IMAGES - 1;
          const extraCount = item.images.length - MAX_VISIBLE_IMAGES;

          const src = elem instanceof File || elem instanceof Blob ? URL.createObjectURL(elem) : normalizeUrl(elem);

          return (
            <ImageItemWrapper
              key={index}
              onClick={() =>
                openLightbox({
                  images: item.images.map(i => i instanceof File || i instanceof Blob ? URL.createObjectURL(i) : normalizeUrl(i)),
                  initialIndex: index
                })
              }
            >
              <ImageItem
                src={src}
                alt={`картинка ${index}`}
              />
              {isLastVisible && extraCount > 0 && (
                <Overlay>
                  +{extraCount}
                </Overlay>
              )}
            </ImageItemWrapper>
          );
        })}
      </CardArhiveImages>
      <CardArhiveText>{item.title}</CardArhiveText>
      <CardArhiveSubtext
        dangerouslySetInnerHTML={{ __html: item.summary }}
      />
      <CardArhiveButtons>
        <BtnBase
          $padding="16px 12px"
          $border
          $width="100%"
          $bg="transparent"
          $color="#D6DCEC"
          onClick={() => unarchivePost(item.id)}
          disabled={isSendPending}
        >
          {isSendPending ? "Разархивация..." : "Разархивировать пост"}
        </BtnBase>
        <CardButton onClick={() => changeContent('live_preview_popup', 'popup', { selectedPost: item, channelId: selectedChannel?.id })}>
          <EyeIcon />
        </CardButton>
        <CardButton
          onClick={(e) => {
            e.stopPropagation();
            changeContent("delete_confirm", "popup_window", {
              itemName: item.title,
              onDelete: () => deletePost(item.id),
            });
          }}
          disabled={deletePending}>
          <DelIcon />
        </CardButton>
      </CardArhiveButtons>
    </CardArhiveItem>
  )
}

const CardArhiveOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #1C2438;
`

const CardArhiveItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; 
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid ${({ $bg }) => $bg ? '#181F30' : '#1F273B'};
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg ? '#181F30' : 'transparent'};

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
    ${CardArhiveOpen} {
      background-color: #1C2438;
      
			svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CardArhiveItemHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px 20px;
`
const CardArhiveItemName = styled.div`
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
`
const CardArhiveItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const CardArhiveItemTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 14px;
  font-weight: 700;
  p {
    text-align: right;
    font-size: 13px;
  }
  span {
    text-align: right;
    font-size: 12px;
    color:#6A7080;
  }
`
const CardArhiveImages = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  flex-grow: 1;
`
const ImageItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
`;
const ImageItem = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`
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
const CardArhiveText = styled.p`
  box-sizing: border-box;
  margin-top: 18px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`
const CardArhiveSubtext = styled.p`
  box-sizing: border-box;
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`
const CardArhiveButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
`
const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
  border: 2px solid #2F3953;
  color: #6A7080;

  &:hover {
    transform: scale(1.1);    
    color: #fff;
  }
`

export default CardArhive