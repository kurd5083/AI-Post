import { useState } from "react";
import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"
import { useAvailableCategories } from "@/lib/channels/categories/useAvailableCategories";
import ModernLoading from "@/components/ModernLoading";
import Checkbox from "@/shared/Checkbox";
import { useApplyCategory } from "@/lib/channels/categories/useApplyCategory";
import { useNotificationStore } from "@/store/notificationStore";

const CompilationPopup = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { popup, changeContent, goBack } = usePopupStore()
  const channelId = popup?.data?.channelId;
  const { addNotification } = useNotificationStore();

  const { mutate: applyCategory, isPending: categoryPending } = useApplyCategory();

  const { categories, categoriesLoading } = useAvailableCategories();

  const handleSave = () => {
    if (!selectedCategory || !channelId) {
      addNotification("Выберите категорию для сохранения", "error");
      return;
    }

    applyCategory(
      {
        channelId,
        category: selectedCategory,
      },
      {
        onSuccess: () => {
          addNotification(`Категория "${selectedCategory}" успешно применена`, "success");
          goBack();
        },
        onError: () => {
          addNotification("Ошибка при сохранении категории", "error");
        },
      }
    );
  };

  return (
    <CompilationContainer>
      {categoriesLoading ? (
        <ModernLoading text="Загрузка категорий..." />
      ) : (
        categories?.length > 0 ? (
          <CompilationList>
            {categories.map((item) => (
              <CompilationItem key={item.id}>
                <Checkbox
                  checked={selectedCategory === item.name}
                  onChange={() => setSelectedCategory(item.name)}
                >
                  <CompilationText>{item.name}</CompilationText>
                </Checkbox>
                <CompilationSubtext>
                  {item.description || "Описание категории"}
                </CompilationSubtext>
                <CompilationFooter>
                  <p>{item.sources.length ?? 0} источника</p>

                  <CompilationOpen
                    onClick={() =>
                      changeContent(
                        "compilation_upload", 'popup', { channelId: channelId, name: item.name, text: "Здесь вы можете просмотреть источники категорий", id: item.id}
                      )
                    }
                  >
                    <img src={arrow} alt="arrow icon" />
                  </CompilationOpen>
                </CompilationFooter>
              </CompilationItem>
            ))}
          </CompilationList>
        ) : (
          <p>Категории не найдены</p>
        )
      )}

      <BtnBase
        $margin="64"
        onClick={handleSave}
        disabled={!selectedCategory || categoryPending}
      >
        {categoryPending ? "Сохраняем..." : "Сохранить"}
      </BtnBase>
    </CompilationContainer>
  )
}

const CompilationContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const CompilationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: max-content;
  gap: 16px;
`;
const CompilationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  p {
    font-size: 14px;
    font-weight: 700;
    color: #336CFF;
  }
`
const CompilationOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #1C2438;
`
const CompilationItem = styled.div`
  position: relative; 
  box-sizing: border-box;
  padding: 24px;
  border-radius: 24px;
  background-color:#181E30;

  &:hover {
    background-color: #1C2438;
    
    ${CompilationOpen} {
      background-color: #336CFF;

      svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CompilationText = styled.p`
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
  padding-right: 40px;
  display: flex;
  align-items: center;
`
const CompilationSubtext = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  padding-bottom: 24px;
  border-bottom: 2px solid #2E3954;
`

export default CompilationPopup