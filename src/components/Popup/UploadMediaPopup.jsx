import { useRef, useState, useCallback } from 'react';
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import preview_img from "@/assets/popup/preview-img.png";
import upload_media from "@/assets/upload-media.svg";
import { usePopupStore } from "@/store/popupStore";
import { useUploadMedia } from '@/lib/mediaLibrary/useUploadMedia';
import { useNotificationStore } from "@/store/notificationStore";
import { useUpdateMediaMetadata } from "@/lib/mediaLibrary/useUpdateMediaMetadata";
import { useLightboxStore } from "@/store/lightboxStore";

const UploadMediaPopup = () => {
  const { closePopup } = usePopupStore();
  const { mutate: uploadMedia, isPending: uploadMediaPending } = useUploadMedia();
  const { mutate: updateMetadata } = useUpdateMediaMetadata();
  const { addNotification } = useNotificationStore();
  const { openLightbox } = useLightboxStore();

  const fileInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const [titles, setTitles] = useState({});

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const addFiles = (files) => {
    const arr = Array.from(files);

    if (selectedFiles.length + arr.length > 10) {
      addNotification("Можно загрузить максимум 10 файлов", "error");
      return;
    }

    arr.forEach(file => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviews(prev => [...prev, reader.result]);
        reader.readAsDataURL(file);
      } else {
        setPreviews(prev => [...prev, preview_img]);
      }
    });

    setSelectedFiles(prev => [...prev, ...arr]);
  };

  const handleFileChange = (e) => addFiles(e.target.files);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    addFiles(e.dataTransfer.files);
  }, [selectedFiles]);

  const handleTitleChange = (index, value) => {
    setTitles(prev => ({ ...prev, [index]: value }));
  };
  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setTitles(prev => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  const handleSave = () => {
    if (!selectedFiles.length) return;

    uploadMedia({ files: selectedFiles }, {
      onSuccess: async (uploadedItems) => {
        if (!uploadedItems?.length) {
          addNotification("Ошибка: не получены ID файлов", "error");
          return;
        }

        await Promise.all(
          uploadedItems.map((file, i) =>
            updateMetadata(
              { id: file.id, data: { description: titles[i] || "" } },
              { onError: () => addNotification("Ошибка обновления метаданных", "error") }
            )
          )
        );

        addNotification("Файлы загружены и обновлены", "success");
        closePopup();
      },
      onError: (err) => addNotification(err?.message || "Ошибка загрузки файлов", "error")
    });
  };
  return (
    <UploadMediaContainer>
      <UploadMediaDownload
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        $isDragOver={isDragOver}
      >
        <UploadMediaDesc>
          {previews.length > 0 && (
            <PreviewContainer>
              {previews.map((src, i) => (
                <UploadDescImg
                  key={i}
                  src={src}
                  alt={`preview ${i}`}
                  // onClick={() => openLightbox({ images: previews.map(img => img), initialIndex: 0 })}
                />
              ))}
              
            </PreviewContainer>
          )}
          <UploadDescContent>
            <h2>Перетяните файлы сюда</h2>
            <p>Для загрузки медиа загрузите файлы на этой странице</p>
            <HiddenInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              id="file-upload"
              multiple
            />
            <BtnBase
              onClick={handleFileButtonClick}
              $bg={isDragOver ? "#2B3B6E" : "#1E2A48"}
            >
              Загрузить файлы
            </BtnBase>
          </UploadDescContent>
        </UploadMediaDesc>

        <UploadMediaMobile>
          <img src={upload_media} alt="upload media img" />
          <h2>Выберите медиа для загрузки</h2>
          <BtnBase
            onClick={handleFileButtonClick}
            $bg={isDragOver ? "#2B3B6E" : "#1E2A48"}
          >
            Загрузить файлы
          </BtnBase>
        </UploadMediaMobile>
      </UploadMediaDownload>

      {selectedFiles.length > 0 && (
        <UploadMediaItem>
          <ItemTitle>Название <mark>(необязательное)</mark></ItemTitle>
          <ItemDesc><mark>Название ссылки</mark> будут видеть только администраторы.</ItemDesc>
          {selectedFiles.map((file, i) => (
            <SelectedFileItem key={i}>

              <FileInfo>
                <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                <RemoveButton onClick={() => removeFile(i)}>×</RemoveButton>
              </FileInfo>

              <ItemInput
                type="text"
                placeholder="Название файла (необязательное)"
                value={titles[i] || ""}
                onChange={(e) => handleTitleChange(i, e.target.value)}
              />
            </SelectedFileItem>
          ))}
        </UploadMediaItem>
      )}

      <UploadMediaButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#336CFF"
          onClick={handleSave}
          disabled={uploadMediaPending || selectedFiles.length === 0}
        >
          {uploadMediaPending ? "Загрузка..." : "Сохранить"}
        </BtnBase>
        <BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={() => closePopup()}>
          Отменить
        </BtnBase>
      </UploadMediaButtons>
    </UploadMediaContainer>
  );
};

const UploadMediaContainer = styled.div`
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
const UploadMediaDownload = styled.div`
  margin-bottom: 48px;
  border-radius: 16px;
  border: 2px dashed ${props => props.$isDragOver ? '#336CFF' : 'transparent'};
  background: ${props => props.$isDragOver ? '#2E3954' : 'transparent'};
  transition: all 0.2s ease;
	@media(max-width: 768px) {
    border-radius: 32px;
  }
`;
const UploadMediaDesc = styled.div`
	display: flex;
  align-items: center;
  gap: 40px;
  @media(max-width: 768px) {
    display: none;
  }
`;
const UploadMediaMobile = styled.div`
	display: none;
	flex-direction: column;
	align-items: center;
	gap: 48px;
	padding: 50px;
	background-color: #1C2438;
	border-radius: 32px;
	text-align: center;
  @media(max-width: 768px) {
    display: flex;
  }
`;
const SelectedFileInfo = styled.div`
	box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
	gap: 20px;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  background: #2E3954;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
	margin-bottom: 12px;
`;
const RemoveButton = styled.button`
  background: #FC5B5B;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 18px;
	font-weight: 600;
	flex-shrink: 0;
    
  &:hover {
    background: #FF4444;
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  max-width: 600px;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6A7080;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #1C2438;
  }
`;
const UploadDescImg = styled.img`
  width: 176px;
  height: 176px;
  border-radius: 32px;
  object-fit: cover;
  border: 7px solid #2E3954;
`;
const UploadDescContent = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 24px;
  }
  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #6A7080;
    margin-bottom: 32px;
  }
`;
const UploadMediaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const SelectedFileItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  background: #2E3954;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;
const ItemTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;

  mark {
    color: #6A7080;
  }
`;
const ItemDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;

  mark {
    color: #FC5B5B;
  }
`;
const ItemInput = styled.input`
  box-sizing: border-box;
  border: 2px solid #333E59;
  border-radius: 12px;
  background-color: transparent;
  max-width: 582px;
  width: 100%;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  color: #D6DCEC;
  
  &::placeholder {
    color: #D6DCEC;
  }
`;

const UploadMediaButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`;

export default UploadMediaPopup;
