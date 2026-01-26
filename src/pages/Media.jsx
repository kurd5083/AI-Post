import { useState } from "react";
import styled from "styled-components";

import download from "@/assets/media/download.svg";
import del from "@/assets/del.svg";

import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import ModernLoading from "@/components/ModernLoading";
import BtnBase from "@/shared/BtnBase";
import Empty from "@/shared/Empty";

import { useGetMediaLibrary } from "@/lib/mediaLibrary/useGetMediaLibrary";
import { useDeleteMediaFile } from "@/lib/mediaLibrary/useDeleteMediaFile";
import { useAddPostImagesMedia } from "@/lib/mediaLibrary/useAddPostImagesMedia";
import { useSearchPexelsPhotos } from "@/lib/mediaLibrary/useSearchPexelsPhotos";
import { useUploadMedia } from '@/lib/mediaLibrary/useUploadMedia';
import { useDebounce } from "@/lib/useDebounce";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useLightboxStore } from "@/store/lightboxStore";
import useSearchStore from "@/store/searchStore";


const Media = () => {
  const [activeTab, setActiveTab] = useState("my");
  const [activeCategory, setActiveCategory] = useState("all");
  const [uploadingIds, setUploadingIds] = useState([]);
  const [addingIds, setAddingIds] = useState([]);

  const { openPopup } = usePopupStore();
  const { addNotification } = useNotificationStore();
  const { openLightbox } = useLightboxStore();
  const { searchQuery } = useSearchStore();
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { photosData, photosLoading } = useSearchPexelsPhotos({
    query: debouncedQuery || "nature",
    per_page: 50,
  });

  const { mediaItems, mediaLoading } = useGetMediaLibrary();
  const { mutate: deleteMedia, isPending: deletingPending } = useDeleteMediaFile();
  const { mutate: addImages, isPending: addingPending } = useAddPostImagesMedia();
  const { mutate: uploadMedia, isPending: uploadMediaPending } = useUploadMedia();

  const categoryButtons = [
    { id: "all", label: "Вся медиа" },
    { id: "images", label: "Изображения" },
    { id: "gifs", label: "Гиф" },
    { id: "videos", label: "Видео" }
  ];

  const filteredMedia = mediaItems?.items?.filter(item => {
    const categoryMatch =
      activeCategory === "all" ||
      (activeCategory === "images" && item.mimeType.startsWith("image/")) ||
      (activeCategory === "gifs" && item.mimeType === "image/gif") ||
      (activeCategory === "videos" && item.mimeType.startsWith("video/"));

    if (!categoryMatch) return false;

    if (!debouncedQuery.trim()) return true;

    const q = debouncedQuery.toLowerCase();

    if (item.description) {
      return item.description.toLowerCase().includes(q);
    } else {
      return item.originalName?.toLowerCase().includes(q);
    }
  });

  const handleSave = (photo) => {
    if (uploadingIds.includes(photo.id)) return;

    setUploadingIds(prev => [...prev, photo.id]);

    uploadMedia({ url: photo.src.original }, {
      onSuccess: () => {
        addNotification("Картинка добавлена", "success");
      },
      onError: (err) => {
        addNotification(err?.message || "Ошибка сохранения картинки", "error");
      },
      onSettled: () => {
        setUploadingIds(prev => prev.filter(id => id !== photo.id));
      }
    });
  };
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
    if (addingIds.includes(item.id)) return;

    openPopup("select_post", "popup_window", {
      onSave: (postId) => {
        if (!postId) return;

        setAddingIds(prev => [...prev, item.id]);

        addImages(
          { postId: postId, images: [], imageUrl: [item.url] },
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
      },
      loading: addingPending
    });
  };
  return (
    <MediaContainer>
      <PageHead>
        <HeadTabs>
          {activeTab === "my" && (
            <BtnBase
              $padding="16px 45px"
              $bg="#336CFF"
              $color="#FFFFFF"
              onClick={() => openPopup("upload_media", "popup")}
            >
              + Загрузить медиа
            </BtnBase>
          )}
          <TabBtn $active={activeTab === "my"} onClick={() => setActiveTab("my")}>Мои медиа</TabBtn>
          <TabBtn $active={activeTab === "pexels"} onClick={() => setActiveTab("pexels")}>Pexels</TabBtn>
        </HeadTabs>
      </PageHead>
      <PageFilter
        placeholder="Поиск по медиа"
        filter={false}
      />
      {/* <MediaHead>
        {categoryButtons.map((button) => (
          <MediaHeadText
            key={button.id}
            $active={activeCategory === button.id}
            onClick={() => setActiveCategory(button.id)}
          >
            {button.label}
          </MediaHeadText>
        ))}
      </MediaHead> */}
      {activeTab === "my" ? (
        mediaLoading ? (
          <ModernLoading text="Загрузка медиа..." />
        ) : filteredMedia?.length === 0 ? (
          <EmptyContainer>
            <Empty icon="🖼️">Медиа отсутствует</Empty>
          </EmptyContainer>
        ) : (
          <MediaCards>
            {filteredMedia?.map((item) => (
              <MediaCard key={item.id}>
                <MediaCardImage
                  src={item.url}
                  alt={item.originalName}
                  onClick={() => openLightbox({ images: [item.url], initialIndex: 0 })}
                />
                <h4>{item.description || item.originalName}</h4>
                <MediaCardSize>
                  <img src={download}
                    alt="download icon"
                    width={16}
                    height={16}
                  />
                  {(item.size / 1024 / 1024).toFixed(2)} MB
                </MediaCardSize>
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
                      }} >
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
              </MediaCard>))}
          </MediaCards>
        )
      ) : (
        photosLoading ? (
          <ModernLoading text="Загрузка фото..." />
        ) : photosData?.photos?.length === 0 ? (
          <EmptyContainer>
            <Empty icon="🖼️">Фото не найдены</Empty>
          </EmptyContainer>
        ) : (
          <MediaCards>
            {photosData.photos.map((photo) => (
              <MediaCard key={photo.id}>
                <MediaCardImage
                  src={photo.src.medium}
                  alt={photo.alt}
                  onClick={() =>
                    openLightbox({
                      images: [photo.src.large2x],
                      initialIndex: 0,
                    })
                  }
                />
                <h4>{photo.photographer}</h4>
                <CardActions>
                  <LeftActions>
                    <BtnBase
                      $bg="transparent"
                      $color="#fff"
                      $border={true}
                      $padding="13px 24px"
                      onClick={() => handleDownload(photo.src.original, "pexels.jpg")}
                    >
                      Скачать
                    </BtnBase>
                  </LeftActions>
                  <BtnBase
                    $bg="#336CFF"
                    $color="#fff"
                    $padding="16px 19px"
                    onClick={() => handleSave(photo)}
                    disabled={uploadingIds.includes(photo.id)}
                  >
                    {uploadingIds.includes(photo.id) ? "Добавление..." : "Добавить в медиа"}
                  </BtnBase>
                </CardActions>
              </MediaCard>
            ))}
          </MediaCards>
        )
      )}
    </MediaContainer>
  )
}

const MediaContainer = styled.div`
  padding-bottom: 30px;
`
const HeadTabs = styled.div`
  display: flex;
  gap: 16px;
`;
const TabBtn = styled.button`
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#336CFF" : "#1C2438")};
  color: ${({ $active }) => ($active ? "#fff" : "#6A7080")};
`;
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
  cursor: pointer;
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
const EmptyContainer = styled.div`
  margin: 0 56px ;

  @media (max-width: 1600px) {
    margin: 0 32px;
  }
  @media (max-width: 768px) {
    margin: 0 24px;
  }
`
export default Media