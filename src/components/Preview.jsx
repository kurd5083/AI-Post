import styled from "styled-components";
import { useMemo, useCallback, useEffect } from "react";
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
  const { mutate: sendTestPost, isPending } = useSendTestPost();
  const { addNotification } = useNotificationStore();

  const { title, summary, url, images } = testResult || {};

  const { previewUrls, remoteUrls, files } = useMemo(() => {
    if (!images?.length) {
      return { previewUrls: [], remoteUrls: [], files: [] };
    }

    const preview = [];
    const remote = [];
    const filesArr = [];

    images.forEach(img => {
      if (typeof img === "string") {
        const normalized = normalizeUrl(img);
        preview.push(normalized);
        remote.push(normalized);
      } else if (img instanceof File || img instanceof Blob) {
        const url = URL.createObjectURL(img);
        preview.push(url);
        filesArr.push(img);
      }
    });

    return { previewUrls: preview, remoteUrls: remote, files: filesArr };
  }, [images]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => url.startsWith("blob:") && URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const hasContent = Boolean(title || summary || url || previewUrls.length);

  const handleSend = useCallback(() => {
    if (!hasContent) {
      addNotification("Нет данных для отправки поста", "info");
      return;
    }

    sendTestPost(
      {
        title,
        summary: summary?.replace(/<br\s*\/?>/gi, "").trim() || "",
        url,
        images: files,
        imagesUrls: remoteUrls,
      },
      {
        onSuccess: () => addNotification("Пост отправлен в Telegram!", "success"),
        onError: () => addNotification("Ошибка отправки поста в Telegram", "error"),
      }
    );
  }, [title, summary, url, files, remoteUrls, hasContent]);

  return (
    <GeneratorPreview>
      <PreviewContent $bg={PreviewBG}>
        <PreviewHead>
          <HeadLeft>
            <EyeIcon color="#336CFF" />
            Лайв превью
          </HeadLeft>
          {view && (
            <HeadArrow onClick={onChange} $collapsed={collapsed}>
              <ArrowIcon color="#D6DCEC" />
            </HeadArrow>
          )}
        </PreviewHead>

        {!collapsed && (
          <>
            <PreviewInfo $bg={PreviewBG}>
              <PreviewInfoContainer>
                {!!previewUrls.length && (
                  <TgImages count={previewUrls.length}>
                    {previewUrls.slice(0, 3).map((src, i) => (
                      <TgImage
                        key={src}
                        $count={previewUrls.length}
                        className={`img-${i + 1}`}
                        onClick={() =>
                          openLightbox({ images: previewUrls, initialIndex: i })
                        }
                      >
                        <img src={src} alt="" />
                        {i === 2 && previewUrls.length > 3 && (
                          <Overlay>+{previewUrls.length - 3}</Overlay>
                        )}
                      </TgImage>
                    ))}
                  </TgImages>
                )}

                <PreviewInfoContent>
                  {hasContent ? (
                    <>
                      <PreviewInfoTitle>{title || "Введите заголовок"}</PreviewInfoTitle>

                      <PreviewInfoText
                        dangerouslySetInnerHTML={{
                          __html:
                            summary?.replace(/<br\s*\/?>/gi, "").trim()
                              ? summary
                              : "Введите текст",
                        }}
                      />

                      {url && (
                        <>
                          <br /><br />
                          <PreviewInfoLinkIcon>🔗 </PreviewInfoLinkIcon>
                          <PreviewInfoLink href={url} target="_blank">
                            Источник
                          </PreviewInfoLink>
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

            <PreviewButton onClick={handleSend} disabled={isPending}>
              <TgIcon color="#336CFF" />
              <p>{isPending ? "Отправляем..." : "Отправить в Telegram"}</p>
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
  box-sizing: border-box;
  position: relative;
  margin-top: 40px;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    height: 100%;
    background-image: ${({ $bg }) => `url(${$bg})`};
    background-size: cover;
    background-position: center;
    border-radius: 24px;
    z-index: 0;
  }
`;

const PreviewInfoContainer = styled.div`
  max-height: 600px;
  border-radius: 16px;
  overflow-y: auto;
  scrollbar-width: none;
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
        grid-template-rows: 260px;
      `;
    }

    if (count === 2) {
      return `
        grid-template-columns: 1fr;
        grid-template-rows: 220px 220px;
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

  ${({ $count }) =>
    $count >= 3 &&
    `
      &.img-1 {
        grid-row: 1 / span 2;
      }

      &.img-2 {
        grid-column: 2;
        grid-row: 1;
      }

      &.img-3 {
        grid-column: 2;
        grid-row: 2;
      }
    `
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
  margin-bottom: 14px;
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