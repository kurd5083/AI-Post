import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import { useChannelSources } from "@/lib/channels/sources/useChannelSources";
import { useAddChannelSource } from "@/lib/channels/sources/useAddChannelSource";
import { useDeleteChannelSource } from "@/lib/channels/sources/useDeleteChannelSource";

const SourcesPopup = () => {
  const { popup, changeContent } = usePopupStore()
  const channelId = popup?.data?.channelId;
  const { sources } = useChannelSources(channelId);
  console.log(sources)

  const [url, setUrl] = useState("");

  const { mutate: addSource } = useAddChannelSource();
  const { mutate: deleteSource } = useDeleteChannelSource();

  return (
    <SourcesContainer>
      <SourcesText>Здесь вы можете добавить источник, откуда сервис будет брать посты. Отображается <mark>имя и URL.</mark></SourcesText>
      <SourcesKey>
        <SourcesKeyTitle>Мои источники:</SourcesKeyTitle>
        <InputPlus
          title="Введите источник"
          bg="#142136"
          color="#2B89ED"
          fs="14px"
          value={url}
          onChange={setUrl}
          onSubmit={() => {
            addSource({ channelId, url });
            setUrl("");
          }}
        />
        {sources?.length === 0 ? (
          <p>Источники не добавлены</p>
        ) : (
          <BlocksItems
            items={sources ? sources.map((source) => ({ value: source.name, id: source.id })) : []} 
            color="#2B89ED"
            onRemove={(id) =>
              deleteSource({ channelId, sourceId: id })
            }
          />
        )}
      </SourcesKey>
      <SourcesButtons>
        <BtnBase $margin="40" onClick={() => changeContent("compilation")} $color="#D6DCEC" $bg="#2B89ED">Подборки источников</BtnBase>
        <BtnBase $margin="64">Сохранить</BtnBase>
      </SourcesButtons>
    </SourcesContainer>
  )
}
const SourcesContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const SourcesText = styled.p`
  color: #6A7080;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  max-width: 400px;

  mark {
    color: #D6DCEC;
  }
  &:nth-of-type(2) {
    margin-top: 48px;
  }
`
const SourcesKey = styled.div`
  margin-top: 40px;
`
const SourcesKeyTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 40px;
`
const SourcesButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default SourcesPopup