import { useState } from "react";
import styled from "styled-components";
import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import BtnBase from "@/shared/BtnBase";
import { mediasData } from "@/data/medimediasDataaData";
import download from "@/assets/media/download.svg";
import del from "@/assets/del.svg";
import { usePopupStore } from "@/store/popupStore";

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const { openPopup } = usePopupStore();
  const categoryButtons = [
    { id: "all", label: "Вся медиа" },
    { id: "images", label: "Изображения" },
    { id: "gifs", label: "Гиф" },
    { id: "videos", label: "Видео" }
  ];

  return (
    <>
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
        {mediasData.map((item) => (
          <MediaCard key={item.id}>
            <MediaCardImage src={item.image} alt="image" />
            <h4>{item.title}</h4>
            <MediaCardSize>
              <img src={download} alt="download icon" width={16} height={16} />
              {item.size} MB
            </MediaCardSize>
            <MediaHash>
              {item.hash.map((elem) => <li>#{elem}</li>)}
            </MediaHash>
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
        ))}
      </MediaCards>
    </>
  )
}
const MediaHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  padding: 0 24px;
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
  grid-template-columns: repeat(auto-fit, minmax(210px, min-content));
  gap: 16px;
  padding: 0 24px;
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
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
	margin-right: 8px;
	border: 2px solid #2F3953;

	&:hover {
		border: none;
		background-color: rgba(239, 98, 132, 0.08);
	}
`

export default Media