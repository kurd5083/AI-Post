import { useState } from "react";
import styled from "styled-components";

import CloseIcon from "@/icons/CloseIcon";

import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelectSec";

import { useGetPosts } from "@/lib/posts/useGetPosts";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

const SelectPostPopup = () => {
  const { popup, goBack, closePopup } = usePopupStore();
  const onSave = popup?.data?.onSave;
  const loading = popup?.data?.loading;
  const { addNotification } = useNotificationStore();

  const { posts } = useGetPosts();
  const { userChannels } = useUserChannels();

  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleSave = () => {
    if (!selectedPostId) {
      addNotification("Выберите пост", "info");
      return;
    }
    onSave(selectedPostId);

    popup && popup?.previousPage.length > 0 ? goBack() : closePopup();
  };

  return (
    <div>
      <SelectPostHead>
        <HeadTitle>Выбрать пост</HeadTitle>
        <CloseButton onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()}>
          <CloseIcon color="#336CFF" />
        </CloseButton>
      </SelectPostHead>
      <SelectPostSubtitle>Укажите пост, к которому хотите добавить медиа</SelectPostSubtitle>
      <CustomSelect
        value={selectedPostId}
        onChange={(option) => setSelectedPostId(option.value)}
        width="100%"
        options={posts?.map((post) => {
          const channel = userChannels?.find(c => c.id === post.channelId);

          return {
            value: post.postId,
            label: post.title,
            icon: channel?.name
          };
        })}
      />
      <SelectPostButtons>
        <BtnBase onClick={handleSave} $color="#D6DCEC" $bg="#336CFF">
          {loading ? "Сохраняем..." : "Сохранить"}
        </BtnBase>
        <BtnBase onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()} $color="#D6DCEC" $bg="#242A3A">
          Отменить
        </BtnBase>
      </SelectPostButtons>
    </div>
  );
};

const SelectPostHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  img {
    cursor: pointer;
  }
`;
const HeadTitle = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  @media(max-width: 480px) {
    font-size: 24px;
    line-height: 24px;
  }
`;
const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SelectPostSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 40px;
`;
const SelectPostButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
  }
`;

export default SelectPostPopup;