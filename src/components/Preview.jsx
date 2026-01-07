import styled from "styled-components";
import { useEffect, useState } from "react";
import eye_blue from "@/assets/eye-blue.svg";
import PreviewBG from "@/assets/ai-generator/PreviewBG.png";
import arrow from "@/assets/arrow.svg";
import TgIcon from "@/icons/TgIcon";
import { useSendTestPost } from "@/lib/posts/useSendTestPost";
import { useLightboxStore } from "@/store/lightboxStore";
import { useNotificationStore } from "@/store/notificationStore";

const Preview = ({ collapsed, onChange, testResult }) => {
  const { openLightbox } = useLightboxStore();
  const { mutate: sendTestPost, isPending: sendPending } = useSendTestPost();
  const { addNotification } = useNotificationStore();

  const { title, summary, url, images } = testResult || {};
  console.log(images)
  const [imagesUrls, setImagesUrls] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);

   useEffect(() => {
    if (!images || !images.length) {
      setImagesUrls([]);
      setLocalFiles([]);
      return;
    }

    const urls = images.filter(img => typeof img === "string"); 
    const files = images.filter(img => img instanceof File || img instanceof Blob); 

    setLocalFiles(files); 

    const objectUrls = files.map(file => URL.createObjectURL(file));
    setImagesUrls([...urls, ...objectUrls]);

    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

   const handleSend = () => {
    if (!testResult || (!title && !summary && imagesUrls.length === 0 && localFiles.length === 0)) {
      addNotification("Нет данных для отправки поста", "info");
      return;
    }

    sendTestPost(
      {
        title: title || "Без названия",
        summary: summary || "",
        images: localFiles, 
        imagesUrls: imagesUrls, 
      },
      {
        onSuccess: () => addNotification("Пост отправлен в Telegram!", "success"),
        onError: () => addNotification("Ошибка отправки поста в Telegram", "error"),
      }
    );
  };

  return (
    <GeneratorPreview $collapsed={collapsed}>
      <PreviewContent>
        <PreviewHead>
          <HeadLeft>
            <img src={eye_blue} alt="eye icon" />
            Лайв превью
          </HeadLeft>
          <HeadArrow src={arrow} alt="arrow icon" onClick={onChange} $collapsed={collapsed} />
        </PreviewHead>

        {!collapsed && (
          <>
            <PreviewInfo>
              <PreviewInfoBG src={PreviewBG} alt="bg" />
              <PreviewInfoContainer>
                {imagesUrls.length > 0 && (
                  <ImagesContainer>
                    {imagesUrls.slice(0, 3).map((imgUrl, index) => {
                      const isLast = index === 2 && imagesUrls.length > 3;
                      const remaining = imagesUrls.length - 3;

                      return (
                        <ImageWrapper
                          key={index}
                          onClick={() =>
                            openLightbox({ images: imagesUrls, initialIndex: index })
                          }
                        >
                          <img src={imgUrl} alt={`image-${index}`} />
                          {isLast && <Overlay>+{remaining}</Overlay>}
                        </ImageWrapper>
                      );
                    })}
                  </ImagesContainer>
                )}

                <PreviewInfoText>
                  {title || summary || url ? (
                    <>
                      {title && <strong>{title}</strong>}
                      <br />
                      {summary}
                      <br />
                      {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          Источник: {url}
                        </a>
                      )}
                    </>
                  ) : (
                    <EmptyText>
                      Превью недоступно. Выберите пост или дождитесь загрузки данных.
                    </EmptyText>
                  )}
                </PreviewInfoText>
              </PreviewInfoContainer>
            </PreviewInfo>

            <PreviewButton onClick={handleSend} disabled={sendPending}>
              <TgIcon color="#336CFF" width="24" height="20" />
              <p>{sendPending ? "Отправляем..." : "Отправить в Telegram"}</p>
            </PreviewButton>
          </>
        )}
      </PreviewContent>
    </GeneratorPreview>
  );
};

// Styled-components остаются без изменений
const GeneratorPreview = styled.div`width: 100%;`;
const PreviewContent = styled.div`
  background-color: #181E30;
  border-radius: 24px;
  padding: 32px;
`;
const PreviewHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
const HeadLeft = styled.h2`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 800;
`;
const HeadArrow = styled.img`
  display: none;
  transform: rotate(90deg);
  cursor: pointer;
  transition: transform 0.3s ease;
  ${({ $collapsed }) => $collapsed && `transform: rotate(270deg);`}
  @media(max-width: 1400px) {
    display: block;
  }
`;
const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
  margin-top: 40px;
  color: #D6DCEC;

  p {
    font-size: 14px;
    font-weight: 700;
  }
`;
const PreviewInfo = styled.div`
  position: relative;
  margin-top: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PreviewInfoBG = styled.img`
  position: absolute;
  border-radius: 24px;
  width: 100%;
  height: calc(100% + 46px);
  object-fit: cover;
`;
const PreviewInfoContainer = styled.div`
  position: relative;
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
  @media(max-width: 1600px) {
    width: calc(100% - 24px);
  } 
`;
const ImagesContainer = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 4px;
  border-radius: 16px;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(19, 28, 34, 0.7);
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PreviewInfoText = styled.p`
  box-sizing: border-box;
  padding: 24px;
  background-color: #131C22;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
`;
const EmptyText = styled.p`
  height: 100px;
  font-size: 14px;
`;

export default Preview;