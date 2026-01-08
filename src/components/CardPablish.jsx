import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { useLightboxStore } from "@/store/lightboxStore";
import { usePostsStore } from "@/store/postsStore";
import { usePopupStore } from "@/store/popupStore";
import normalizeUrl from "@/lib/normalizeUrl";
import AvaPlug from "@/shared/AvaPlug";

const MAX_VISIBLE_IMAGES = 3;

const CardPablish = ({ item, bg, selectedChannel }) => {
  console.log(selectedChannel)
  const { openLightbox } = useLightboxStore();
  const { addPost } = usePostsStore();
  const { changeContent } = usePopupStore();

  const handleEdit = () => {
    addPost({
      postId: item.id,
      title: item.title,
      text: item.text || "",
      summary: item.summary || "",
      images: item.images || [],
      time: "",
      serverId: item.id,
      placeholder: "Новый пост",
    });
    changeContent('create_post', 'popup')
  };

  return (
    <CardPablishItem $bg={bg}>
      <CardPablishItemHead>
        <CardPablishItemName>
          {selectedChannel.avatarUrl ? (
                      <CardPablishItemImg src={selectedChannel.avatarUrl} alt={selectedChannel.name} />
                    ) : (
                      <AvaPlug width="32px" height="32px"/>
                    )}
          <p>{selectedChannel.name}</p>
        </CardPablishItemName>
        <CardPablishItemTime>
          <p>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</p>
          <span>
            {new Date(item.createdAt).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
      </CardPablishImages>
      <CardPablishText>{item.title}</CardPablishText>
      <CardPablishSubtext
        dangerouslySetInnerHTML={{ __html: item.summary }}
      />
      <CardPablishButtons>
        <BtnBase
          $padding="16px 24px"
          $width="100%"
          $bg="transporent"
          $color="#D6DCEC"
          $border={true}
          onClick={handleEdit}
        >
          Редактировать
        </BtnBase>
      </CardPablishButtons>
    </CardPablishItem>
  )
}

const CardPablishOpen = styled.button`
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

const CardPablishItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; 
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid ${({ $bg }) => $bg ? '#181F30' : '#1F273B'};
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg ? '#181F30' : 'transporent'};

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
    ${CardPablishOpen} {
      background-color: #1C2438;
      
			svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CardPablishItemHead = styled.div`
  display: flex;
  justify-content: space-between;
`
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
`
const CardPablishItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const CardPablishItemTime = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  font-weight: 700;
  span {
    color:#6A7080;
  }
`
const CardPablishImages = styled.div`
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
const CardPablishText = styled.p`
  box-sizing: border-box;
  margin-top: 18px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const CardPablishSubtext = styled.p`
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
`
const CardPablishButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`

export default CardPablish