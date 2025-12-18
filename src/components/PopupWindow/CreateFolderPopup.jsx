import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import CloseIcon from "@/icons/CloseIcon";
import { useCreateFolder } from "@/lib/useCreateFolder";
import { useUser } from "@/lib/useUser";

const CreateFolderPopup = () => {
  const { closePopup } = usePopupStore();
  const { user } = useUser();
  const { mutate: createFolder, isLoading } = useCreateFolder();
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#264780");

  const colorOptions = [
    "#264780",
    "#185D53",
    "#71531F",
    "#EB4644",
    "#4B3F94",
    "#186184",
    "#466A33",
    "#74442B",
    "#69315B",
  ];

  const handleCreate = () => {
    if (!folderName) return alert("Введите название папки");

    createFolder(
      {
        name: folderName,
        description: folderDescription,
        color: selectedColor,
        icon: "📁",
        unifiedPostingSettings: false,
        unifiedScheduleSettings: false,
        individualPromotionSettings: true,
        ownerTelegramId: user.telegramId
      },
      {
        onSuccess: () => closePopup(),
      }
    );
  };

  return (
    <div>
      <CreateFolderHead>
        <HeadTitle>Создать папку</HeadTitle>
        <CloseIcon color="#336CFF" onClick={closePopup} />
      </CreateFolderHead>
      <CreateFolderSubtitle>
        Используйте папки для удобства управления каналами
      </CreateFolderSubtitle>

      <CreateFolderTitle>Название папки</CreateFolderTitle>
      <CreateFolderInput
        type="text"
        placeholder="Введите название папки"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />

      <CreateFolderTitle>Описание папки</CreateFolderTitle>
      <CreateFolderInput
        type="text"
        placeholder="Добавьте описание"
        value={folderDescription}
        onChange={(e) => setFolderDescription(e.target.value)}
      />

      <CreateFolderTitle>Цвет</CreateFolderTitle>
      <CreateFolderUl>
        {colorOptions.map((color) => (
          <ColorItem
            key={color}
            $color={color}
            $selected={selectedColor === color}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </CreateFolderUl>

      <CreateFolderButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#336CFF"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? "Создание..." : "Создать"}
        </BtnBase>
        <BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">
          Отменить
        </BtnBase>
      </CreateFolderButtons>
    </div>
  );
};

const CreateFolderHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
`;

const HeadTitle = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
`;

const CreateFolderSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;

const CreateFolderTitle = styled.h2`
  text-transform: uppercase;
  color: #6a7080;
  font-size: 12px;
  font-weight: 700;
  margin: 48px 0 26px;
  border: none;
`;

const CreateFolderInput = styled.input`
  background-color: transparent;
  width: 100%;
  color: #d6dcec;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2e3954;
  &::placeholder {
    color: #d6dcec;
  }
`;

const CreateFolderUl = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ColorItem = styled.li`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.$color};
  cursor: pointer;
  border: ${(props) => (props.$selected ? "3px solid #336CFF" : "none")};
`;

const CreateFolderButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
    justify-content: center;
  }
`;

export default CreateFolderPopup;
