import styled from "styled-components";
import BlocksItems from '@/shared/BlocksItems'
import BtnBase from '@/shared/BtnBase'
import InputPlus from '@/shared/InputPlus'
import { usePopupStore } from "@/store/popupStore";
import habr from "@/assets/habr.png";
import youtube from "@/assets/youtube.png";
import facebook from "@/assets/facebook.png";

const CompilationUploadPopup = () => {
  const { goBack } = usePopupStore()
  return (
    <CompilationContainer>
      <InputPlus title="ИСТОЧНИК" placeholder="Введите свой источник" bg="#2B243C" color="#FF55AD"/>
      <BlocksItems items={[{
          icon: habr,
          value: 'habr.com'
        }, {
          icon: youtube,
          value: 'youtube.com'
        }, {
          icon: facebook,
          value: 'facebook.com'
        }]} color="#EF6284" />
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