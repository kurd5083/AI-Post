import styled from "styled-components";
import BlocksItems from '@/shared/BlocksItems'
import BtnBase from '@/shared/BtnBase'
import InputPlus from '@/shared/InputPlus'
import { usePopupStore } from "@/store/popupStore";
import { useAvailableCategories } from "@/lib/channels/categories/useAvailableCategories";

const CompilationUploadPopup = () => {
  const { popup, goBack } = usePopupStore()
  const { categories } = useAvailableCategories();
  const categoryId = popup?.data?.id;
  const category = categories.find(cat => cat.id === categoryId);
  console.log(category)
  return (
    <CompilationContainer>
      <BlocksItems
        items={category?.sources?.map((source) => ({ value: source.name }))}
        view={false}
        color="#EF6284"
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