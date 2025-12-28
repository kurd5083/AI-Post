import { useState } from "react";
import styled from "styled-components";
import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import BtnBase from "@/shared/BtnBase";
import { mediasDatas } from "@/data/mediasDatas";
import download from "@/assets/media/download.svg";
import del from "@/assets/del.svg";
import { usePopupStore } from "@/store/popupStore";
import { useGetMediaLibrary } from "@/lib/mediaLibrary/useGetMediaLibrary";

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const { openPopup } = usePopupStore();
  const { mediaItems, mediaLoading } = useGetMediaLibrary();
  
  const categoryButtons = [
    { id: "all", label: "Вся медиа" },
    { id: "images", label: "Изображения" },
    { id: "gifs", label: "Гиф" },
    { id: "videos", label: "Видео" }
  ];
  
   const filteredMedia = mediaItems?.filter(item => {
    if (activeCategory === "all") return true;
    if (activeCategory === "images") return item.mimeType.startsWith("image/");
    if (activeCategory === "gifs") return item.mimeType === "image/gif";
    if (activeCategory === "videos") return item.mimeType.startsWith("video/");
    return true;
  });

  return (
    <MediaContainer>
      <PageHead>
				<BtnBase 
          $padding="16px 45px" 
          $bg="#336CFF"
          $color="#FFFFFF"
          onClick={() => openPopup("upload_media")}
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
      <MediaCards>
        {mediaLoading ? (
          <p>Загрузка...</p>
        ) : filteredMedia.length === 0 ? (
          <p>Медиа отсутствует</p>
        ) : (
          filteredMedia.map((item) => (
            <MediaCard key={item.id}>
              <MediaCardImage src={item.url} alt={item.originalName} />
              <h4>{item.originalName}</h4>
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
                  <BtnBase $bg="transparent" $color="#fff" $border={true} $padding="13px 24px">
                    Скачать
                  </BtnBase>
                  <DeleteButton>
                    <img src={del} alt="del icon" width={14} height={16}/>
                  </DeleteButton>
                </LeftActions>
                <BtnBase $bg="#336CFF" $color="#fff" $padding="16px 19px">
                  Добавить в пост
                </BtnBase>
              </CardActions>
            </MediaCard>
          ))
        )}
      </MediaCards>
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 0 56px;
  
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
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

export default Media