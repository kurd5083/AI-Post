import { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { useImagePresets } from "@/lib/channels/image-generation/useImagePresets";
import { useGetChannelImagePreset } from "@/lib/channels/image-generation/useGetChannelImagePreset";
import { useUpdateChannelImagePreset } from "@/lib/channels/image-generation/useUpdateChannelImagePreset";
import { usePopupStore } from "@/store/popupStore";
import ModernLoading from "@/components/ModernLoading";
import { useNotificationStore } from "@/store/notificationStore";
import { useLightboxStore } from "@/store/lightboxStore";
import normalizeUrl from "@/lib/normalizeUrl";

const ImageGenerationPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { openLightbox } = useLightboxStore();
  const { imagePresets, imagePresetsLoading } = useImagePresets();
  const { imageChannelPreset } = useGetChannelImagePreset(channelId);

  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const { addNotification } = useNotificationStore();
  const { mutate: updateImagePreset } = useUpdateChannelImagePreset();

  useEffect(() => {
    if (imageChannelPreset) {
      setSelectedPresetId(imageChannelPreset.id);
    }
  }, [imageChannelPreset]);

  const handlePresetChange = (presetId) => {
    if (!channelId) return;

    updateImagePreset(
      { channelId, presetId },
      {
        onSuccess: () => {
          setSelectedPresetId(presetId);
          addNotification("Стилизация успешно применена", "success");
        },
        onError: (err) => {
          addNotification(err?.message || "Недостаточно прав для изменения стиля", "error");
        },
      }
    );
  };

  if (imagePresetsLoading) {
    return <ModernLoading text="Загрузка стилей..." />;
  }

  return (
    <ImageGenerationContent>
      <ImageGenerationContentTitle>Выберите одну стилистику</ImageGenerationContentTitle>
      {imagePresets?.map((item) => (
        <ImageGenerationContentItem key={item.id}>
          <Checkbox
            checked={selectedPresetId === item.id}
            onChange={() => handlePresetChange(item.id)}
          >
            <div>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          </Checkbox>
          <ImageGenerationImg
            src={normalizeUrl(item.imageUrl)}
            alt="icon style"
            onClick={() =>
              openLightbox({
                images: [normalizeUrl(item.imageUrl)],
                initialIndex: 0,
              })
            }
          />
        </ImageGenerationContentItem>
      ))}
    </ImageGenerationContent>
  );
};

const ImageGenerationContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 56px 30px;

  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }
`;

const ImageGenerationContentTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
`;

const ImageGenerationContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;

  &:first-child { padding-top: 0; }
  &:last-child { padding-bottom: 0; border-bottom: 0; }

  h4 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    @media(max-width: 480px) { font-size: 20px; }
  }

  p {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
    @media(max-width: 480px) { font-size: 12px; }
  }
`;

const ImageGenerationImg = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  @media(max-width: 480px) { width: 48px; height: 48px; }
`;

export default ImageGenerationPopup;
