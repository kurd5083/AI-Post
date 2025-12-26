import styled from "styled-components";
import BlocksItems from '@/shared/BlocksItems'
import BtnBase from '@/shared/BtnBase'
import InputPlus from '@/shared/InputPlus'
import { usePopupStore } from "@/store/popupStore";
// import habr from "@/assets/habr.png";
// import youtube from "@/assets/youtube.png";
// import facebook from "@/assets/facebook.png";
import { useAvailableCategories } from "@/lib/channels/categories/useAvailableCategories";

const CompilationUploadPopup = () => {
  const { goBack } = usePopupStore()
  const { categories, categoriesLoading } = useAvailableCategories();

  return (
    <CompilationContainer>
      <InputPlus title="ИСТОЧНИК" placeholder="Введите свой источник" bg="#2B243C" color="#FF55AD" />
      <BlocksItems
        items={categories?.sources.map((source) => ({ value: source }))}
        color="#EF6284"
        onRemove={(value) =>
          removeKeyword({ channelId, source: value })
        }
      />
      <BtnBase onClick={goBack} $margin="48">Вернуться в подборки</BtnBase>
    </CompilationContainer>
  )
}

const CompilationContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;

export default CompilationUploadPopup