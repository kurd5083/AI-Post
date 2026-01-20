import styled from "styled-components";
import { useEffect, useState } from "react";
import EyeIcon from "@/icons/EyeIcon";
import PreviewBG from "@/assets/ai-generator/PreviewBG.png";
import ArrowIcon from "@/icons/ArrowIcon";
import TgIcon from "@/icons/TgIcon";
import { useSendTestPost } from "@/lib/posts/useSendTestPost";
import { useLightboxStore } from "@/store/lightboxStore";
import { useNotificationStore } from "@/store/notificationStore";
import normalizeUrl from "@/lib/normalizeUrl";

const Preview = ({ collapsed, onChange, testResult, view = true }) => {
  const { openLightbox } = useLightboxStore();
  const { mutate: sendTestPost, isPending: sendPending } = useSendTestPost();
  const { addNotification } = useNotificationStore();
  const { title, summary, url, images } = testResult || {};
  const [localimagesUrls, setLocalimagesUrls] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);

  useEffect(() => {
    if (!images || !images.length) {
      setLocalimagesUrls([]);
      setImagesUrls([]);
      setLocalFiles([]);
      return;
    }

    const urls = images.filter(img => typeof img === "string").map(img => normalizeUrl(img));
    const files = images.filter(img => img instanceof File || img instanceof Blob);

    setLocalFiles(files);

    const objectUrls = files.map(file => URL.createObjectURL(file));
    setImagesUrls([...urls]);
    setLocalimagesUrls([...urls, ...objectUrls]);

    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleSend = () => {
    if (!testResult || (!!title && !!summary && imagesUrls.length === 0 && localFiles.length === 0)) {
      addNotification("Нет данных для отправки поста", "info");
      return;
    }

    sendTestPost(
      {
        title: title,
        summary: summary.replace(/<br\s*\/?>/gi, "").trim() || "",
        url: url,
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
            <EyeIcon color="#336CFF" hoverColor="#336CFF" cursor="default" />
            Лайв превью
          </HeadLeft>
          {view && <HeadArrow onClick={onChange} $collapsed={collapsed}><ArrowIcon color="#D6DCEC" /></HeadArrow>}
        </PreviewHead>

        {!collapsed && (
          <>
            <PreviewInfo>
              <PreviewInfoBG src={PreviewBG} alt="bg" />
              <PreviewInfoContainer>
                {localimagesUrls.length > 0 && (
                  <TgImages count={localimagesUrls.length}>
                    {localimagesUrls.slice(0, 3).map((imgUrl, index) => {
                      const isOverlay = index === 2 && localimagesUrls.length > 3;
                      const remaining = localimagesUrls.length - 3;

                      return (
                        <TgImage
                          key={index}
                          className={`img-${index + 1}`}
                          onClick={() =>
                            openLightbox({ images: localimagesUrls, initialIndex: index })
                          }
                        >
                          <img src={imgUrl} alt="" />
                          {isOverlay && <Overlay>+{remaining}</Overlay>}
                        </TgImage>
                      );
                    })}
                  </TgImages>
                )}
                <PreviewInfoContent>
                  {title || summary || url || images?.length > 0 ? (
                    <>
                      {console.log(summary)}

                      <PreviewInfoTitle>{!!title ? title : "Введите заголовок"}<br /><br /></PreviewInfoTitle>
                      <>
                        <PreviewInfoText
                          dangerouslySetInnerHTML={{
                            __html:
                              !!summary && summary.replace(/<br\s*\/?>/gi, "").trim()
                                ? summary
                                : "Введите текст"
                          }}
                        />

                      </>
                      {url && (
                        <>
                          <br /><br />
                          <PreviewInfoLinkIcon>🔗 </PreviewInfoLinkIcon>
                          <PreviewInfoLink href={url} target="_blank" rel="noopener noreferrer">Источник</PreviewInfoLink>
                        </>
                      )}
                    </>
                  ) : (
                    <EmptyText>
                      Превью недоступно. Выберите пост или дождитесь загрузки данных.
                    </EmptyText>
                  )}
                </PreviewInfoContent>
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
const HeadArrow = styled.div`
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
  padding: 0 20px;
`;
const PreviewInfoBG = styled.img`
  position: absolute;
  border-radius: 24px;
  width: 100%;
  height: calc(100% + 46px);
  object-fit: cover;
`;
const PreviewInfoContainer = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: #131C22;

`;
const TgImages = styled.div`
  margin: 0 auto;
  display: grid;
  gap: 4px;
  max-width: 400px;
  overflow: hidden;

  ${({ count }) => {
    if (count === 1) {
      return `
        grid-template-columns: 1fr;
        grid-template-rows: 240px;
      `;
    }

    if (count === 2) {
      return `
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 180px;
      `;
    }

    if (count === 3) {
      return `
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 120px 120px;
      `;
    }

    return `
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 120px 120px;
    `;
  }}
`;

const TgImage = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &.img-1 {
    grid-row: ${({ className }) =>
    className?.includes("img-1") ? "1 / span 2" : "auto"};
  }

  &.img-2 {
    grid-column: 2;
    grid-row: 1;
  }

  &.img-3 {
    grid-column: 2;
    grid-row: 2;
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
const PreviewInfoContent = styled.p`
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  scrollbar-width: none;
  max-width: 400px;
  width: 100%;
  overflow-y: auto;
`;

const PreviewInfoTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
`;
const PreviewInfoText = styled.span`
  scrollbar-width: none;
  white-space: pre-wrap;
  word-break: break-word;
`;
const PreviewInfoLinkIcon = styled.span`
  font-size: 14px;
`;
const PreviewInfoLink = styled.a`
  color: #0048ff;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
const EmptyText = styled.p`
  height: 100px;
  font-size: 14px;
`;

export default Preview;