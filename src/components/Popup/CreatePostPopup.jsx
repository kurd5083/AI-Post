import { useEffect } from "react";

import styled from "styled-components";
import create_post from "@/assets/popup/create-post-sec.svg";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useGeneratePost } from "@/lib/posts/useGeneratePost";

const CreatePostPopup = () => {
  const { popup, goBack, closePopup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const {
    mutate: generatePost,
    isLoading,
    isSuccess,
    isError,
  } = useGeneratePost();

  useEffect(() => {
    if (channelId) {
      generatePost(channelId);
    }
  }, [channelId, generatePost]);

  return (
    <CreatePostContainer>
      <img src={create_post} alt="create post icon" width={123} height={113} />
      {isLoading && (
        <>
          <CreatePostTitle>Генерируем пост</CreatePostTitle>
          <CreatePostText>
            Это может занять несколько минут. Пожалуйста, не закрывайте окно
          </CreatePostText>
          <BtnBase $color="#AC60FD" $bg="#201F39" onClick={goBack}>
            Отменить генерацию
          </BtnBase>
        </>
      )}

      {isSuccess && (
        <>
          <CreatePostTitle>Пост готов ✨</CreatePostTitle>
          <CreatePostText>
            Пост успешно сгенерирован и готов к публикации
          </CreatePostText>
          <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={closePopup}>
            Продолжить
          </BtnBase>
        </>
      )}

      {isError && (
        <>
          <CreatePostTitle>Ошибка</CreatePostTitle>
          <CreatePostText>
            Не удалось сгенерировать пост. Попробуйте ещё раз
          </CreatePostText>
          <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={goBack}>
            Назад
          </BtnBase>
        </>
      )}
    </CreatePostContainer>
  )
}

const CreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
  @media(max-width: 480px) {
    margin-top: 80px;
  }
`
const CreatePostTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 24px;
  text-align: center;
`
const CreatePostText = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #6A7080;
  text-align: center;
  line-height: 24px;
`

export default CreatePostPopup