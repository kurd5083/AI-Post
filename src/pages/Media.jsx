import { useState } from "react";
import styled from "styled-components";

import download from "@/assets/media/download.svg";
import del from "@/assets/del.svg";

import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useLightboxStore } from "@/store/lightboxStore";

import { useGetMediaLibrary } from "@/lib/mediaLibrary/useGetMediaLibrary";
import ModernLoading from "@/components/ModernLoading";
import { useDeleteMediaFile } from "@/lib/mediaLibrary/useDeleteMediaFile";
import { useAddPostImagesMedia } from "@/lib/mediaLibrary/useAddPostImagesMedia";

import BtnBase from "@/shared/BtnBase";

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const { openPopup } = usePopupStore();
  const { addNotification } = useNotificationStore();
  const { openLightbox } = useLightboxStore();
  const [addingIds, setAddingIds] = useState([]);

  const { mediaItems, mediaLoading } = useGetMediaLibrary();
  const { mutate: deleteMedia, isPending: deletingPending } = useDeleteMediaFile();
  const { mutate: addImages, isPending: addingPending } = useAddPostImagesMedia();

  const categoryButtons = [
    { id: "all", label: "Вся медиа" },
    { id: "images", label: "Изображения" },
    { id: "gifs", label: "Гиф" },
    { id: "videos", label: "Видео" }
  ];

  const filteredMedia = mediaItems?.items?.filter(item => {
    if (activeCategory === "all") return true;
    if (activeCategory === "images") return item.mimeType.startsWith("image/");
    if (activeCategory === "gifs") return item.mimeType === "image/gif";
    if (activeCategory === "videos") return item.mimeType.startsWith("video/");
    return true;
  });

  const handleDelete = (id, name) => {
    deleteMedia(id, {
      onSuccess: () => addNotification(`Файл ${name} удалён`, "delete"),
      onError: (err) => addNotification(err.message || "Ошибка удаления", "error"),
    });
  };
  const handleDownload = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleAddToPost = (item) => {
    console.log(item)
    if (addingIds.includes(item.id)) return;

    setAddingIds(prev => [...prev, item.id]);

    addImages(
      { postId: 823, images: [], imageNames: [item.url] },
      {
        onSuccess: () => {
          addNotification(`Изображение ${item.originalName} добавлено к посту`, "success");
        },
        onError: (err) => {
          addNotification(err?.message || "Ошибка добавления изображения", "error");
        },
        onSettled: () => {
          setAddingIds(prev => prev.filter(id => id !== item.id));
        }
      }
    );
  };
  return (
    <MediaContainer>
      <PageHead>
        <BtnBase
          $padding="16px 45px"
          $bg="#336CFF"
          $color="#FFFFFF"
          onClick={() => openPopup("upload_media", "popup")}
        >
          + Загрузить медиа
        </BtnBase>
      </PageHead>
      <PageFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        placeholder="Поиск по медиа"
      />
      <MediaHead>
        {categoryButtons.map((button) => (
          <MediaHeadText
            key={button.id}
            $active={activeCategory === button.id}
            onClick={() => setActiveCategory(button.id)}
          >
            {button.label}
          </MediaHeadText>
        ))}
      </MediaHead>
      {mediaLoading ? (
        <ModernLoading text="Загрузка медиа..." />
      ) : filteredMedia?.length === 0 ? (
        <EmptyStat>Медиа отсутствует</EmptyStat>
      ) : (
        <MediaCards>
          {filteredMedia?.map((item) => (
            <MediaCard key={item.id}>
              <MediaCardImage
                src={item.url}
                alt={item.originalName}
                onClick={() => openLightbox({
                  images: [item.url],
                  initialIndex: 0
                })}
              />
              <h4>{item.description}</h4>
              <MediaCardSize>
                <img src={download} alt="download icon" width={16} height={16} />
                {(item.size / 1024 / 1024).toFixed(2)} MB
              </MediaCardSize>
              {item.tags?.length > 0 && (
                <MediaHash>
                  {item.tags.map((tag, index) => <li key={index}>#{tag}</li>)}
                </MediaHash>
              )}
              <CardActions>
                <LeftActions>
                  <BtnBase
                    $bg="transparent"
                    $color="#fff"
                    $border={true}
                    $padding="13px 24px"
                    onClick={() => handleDownload(item.url, item.originalName)}
                  >
                    Скачать
                  </BtnBase>
                  <DeleteButton
                    disabled={deletingPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      openPopup("delete_confirm", "popup_window", {
                        itemName: item.originalName,
                        onDelete: () => handleDelete(item.id, item.originalName),
                      });
                    }}
                  >
                    <img src={del} alt="del icon" width={14} height={16} />
                  </DeleteButton>
                </LeftActions>
                <BtnBase
                  $bg="#336CFF"
                  $color="#fff"
                  $padding="16px 19px"
                  disabled={addingIds.includes(item.id)}
                  onClick={() => handleAddToPost(item)}
                >
                  {addingIds.includes(item.id) ? "Добавление..." : "Добавить в пост"}
                </BtnBase>
              </CardActions>
            </MediaCard>
          ))}
        </MediaCards>
      )}
    </MediaContainer>
  )
}

const MediaContainer = styled.div`
  padding-bottom: 30px;
`
const MediaHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  padding: 0 56px;
  overflow-x: auto;
  scrollbar-width: none;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const MediaHeadText = styled.p`
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) => $active ? '#D6DCEC' : '#8a94ad'};
  }
`
const MediaCards = styled.div`
  display: grid;
  gap: 16px;
  padding: 0 56px ;
  grid-template-columns: repeat(6, 1fr);
@media (max-width: 1800px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 32px;
  }
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    padding: 0 24px;
    grid-template-columns: 1fr;
  }
`
const MediaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background-color: #181F30;
  padding: 24px;
  border-radius: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    margin: 0;
    max-width: 180px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`
const MediaCardImage = styled.img`
  border-radius: 16px;
  object-fit: cover;
  width: 170px;
  height: 170px;
  @media(max-width: 480px) {
    width: 290px;
    height: 210px;
  }
`
const MediaCardSize = styled.p`
	display: flex;
	align-items: center;
	gap: 16px;
	font-size: 14px;
	font-weight: 700;
	color: #6A7080;
`
const MediaHash = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

  li {
    padding: 16px;
    border-radius: 12px;
    color: #AC60FD;
    background-color: #242440;
    font-size: 14px;
    font-weight: 700;
  }
`
const CardActions = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
  button {
    width: 100%;
  }
`
const LeftActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
const DeleteButton = styled.button`
	display: flex;
  align-items: center;
  justify-content: center;
  width: 48px !important;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
	border: 2px solid #2F3953;

	&:hover {
		border: none;
		background-color: rgba(239, 98, 132, 0.08);
	}
`
const EmptyStat = styled.div`
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  margin: 0 56px ;

  @media (max-width: 1600px) {
    margin: 0 32px;
  }
  @media (max-width: 768px) {
    margin: 0 24px;
  }
`
export default Media