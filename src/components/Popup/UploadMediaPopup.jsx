import { useRef, useState, useCallback } from 'react';
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import preview_img from "@/assets/popup/preview-img.png";
import { usePopupStore } from "@/store/popupStore";

const UploadMediaPopup = () => {
    const { closePopup } = usePopupStore()
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(preview_img);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file) {
            setSelectedFile(file);
            
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

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
        
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    }, []);

    const removeFile = () => {
        setSelectedFile(null);
        setPreview(preview_img);
    };

    return (
        <div>
            <UploadMediaDownload 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                $isDragOver={isDragOver}
            >
                <UploadMediaImg src={preview} alt="preview img" />
                <UploadMediaContent>
                    <h2>Перетяните файлы сюда</h2>
                    <p>Для загрузки медиа загрузите файлы на этой странице</p>
                    <HiddenInput 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        id="file-upload"
                    />
                    <BtnBase 
                        onClick={handleFileButtonClick}
                        style={{ cursor: 'pointer' }}
                        $bg={isDragOver ? "#2B3B6E" : "#1B243E"}
                    >
                        Загрузить файлы
                    </BtnBase>
                    
                    {selectedFile && (
                        <SelectedFileInfo>
                            <span>Выбран файл: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                            <RemoveButton onClick={removeFile}>×</RemoveButton>
                        </SelectedFileInfo>
                    )}
                </UploadMediaContent>
            </UploadMediaDownload>
            <UploadMediaItem>
                <ItemTitle>Название <mark>(необязательное)</mark></ItemTitle>
                <ItemDesc><mark>Название ссылки</mark> будут видеть только администраторы.</ItemDesc>
                <ItemInput 
                    type="text" 
                    placeholder="Название" 
                    defaultValue={selectedFile?.name?.replace(/\.[^/.]+$/, "") || ""}
                />
            </UploadMediaItem>
            <UploadMediaBlock>
                <InputPlus title="ХЕШТЕГИ" placeholder="Введите хештег" img="crimson"/>
                <BlocksItems items={['Технологии', 'Программирование', 'Деньги']} color="#EF6284" />
            </UploadMediaBlock>
            <UploadMediaButtons>
                <BtnBase $color="#D6DCEC" $bg="#336CFF">Сохранить</BtnBase>
                <BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={() => closePopup()}>Отменить</BtnBase>
            </UploadMediaButtons>
        </div>
    )
}

const HiddenInput = styled.input`
    display: none;
`;

const UploadMediaDownload = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    margin-bottom: 48px;
    border-radius: 16px;
    border: 2px dashed ${props => props.$isDragOver ? '#336CFF' : 'transparent'};
    background: ${props => props.$isDragOver ? '#2E3954' : 'transparent'};
    transition: all 0.2s ease;
`;

const SelectedFileInfo = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #D6DCEC;
    font-weight: 600;
    padding: 12px 16px;
    background: #2E3954;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
`;

const RemoveButton = styled.button`
    background: #FC5B5B;
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding: 0;
    
    &:hover {
        background: #FF4444;
    }
`;

const UploadMediaImg = styled.img`
    width: 176px;
    height: 176px;
    border-radius: 32px;
    object-fit: cover;
    border: 7px solid #2E3954;
`
const UploadMediaContent = styled.div`
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
`

const UploadMediaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const ItemTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;

  mark {
    color: #6A7080;
  }
`
const ItemDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;

  mark {
    color: #FC5B5B;
  }
`
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
`

const UploadMediaBlock = styled.div`
  margin-top: 40px;
`
const UploadMediaButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`
export default UploadMediaPopup