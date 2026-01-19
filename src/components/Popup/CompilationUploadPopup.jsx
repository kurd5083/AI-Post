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

  return (
    <CompilationContainer>
      <CompilationTitle>Источники категорий:</CompilationTitle>
      {category?.sources.length > 0 ? (
      <BlocksItems
        items={category?.sources?.map((source, index) => {
              const url = new URL(source.url);
              const domain = url.origin;
              const favicon = `${domain}/favicon.ico`;

              return {
                icon: favicon,
                value: source.name,
                id: index
              };
            })}
        view={false}
        color="#EF6284"
      />
      ) : (
        <EmptyText>Нет источников для этой категории</EmptyText>
      )}
      <BtnBase onClick={goBack} $margin="48">Вернуться в подборки</BtnBase>
    </CompilationContainer>
  )
}

const CompilationContainer = styled.div`
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`;
const CompilationTitle = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
  font-weight: 700;
  font-size: 24px;
`
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;
export default CompilationUploadPopup