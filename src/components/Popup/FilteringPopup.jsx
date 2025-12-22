import { useState } from "react";
import styled from "styled-components";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";
import { usePopupStore } from "@/store/popupStore"
import { useChannelById } from "@/lib/channels/useChannelById";
import { useAddChannelKeyword } from "@/lib/channels/filtering/useAddChannelKeyword";
import { useRemoveChannelKeyword } from "@/lib/channels/filtering/useRemoveChannelKeyword";
import { useAddChannelStopword } from "@/lib/channels/filtering/useAddChannelStopword";
import { useRemoveChannelStopword } from "@/lib/channels/filtering/useRemoveChannelStopword";

const FilteringPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { channel } = useChannelById(channelId);

  const [keyword, setKeyword] = useState("");
  const [stopword, setStopword] = useState("");
  const { mutate: addKeyword } = useAddChannelKeyword();
  const { mutate: removeKeyword } = useRemoveChannelKeyword();
  const { mutate: addStopword } = useAddChannelStopword();
  const { mutate: removeStopword } = useRemoveChannelStopword();
	return (
		<FilteringContainer>
			<FilteringText>Добавьте ключевые слова для фильтрации новостей по заголовкам, или<br />
				оставьте список пустым, чтобы получать все новости. <mark>В Telegram-каналах <br />
					и группах/пабликах VK</mark> поиск осуществляется по всему содержанию.</FilteringText>
			<FilteringKey>
				<InputPlus 
          title="Ключевые слова" 
          placeholder="Введите ключевое слово" 
          bg="#2B243C" 
          color="#FF55AD"
          value={keyword}
          onChange={setKeyword}
          onSubmit={() => {
            addKeyword({ channelId, keyword });
            setKeyword("");
          }}
        />
				<BlocksItems 
          items={channel.keywords.map((k) => ({ value: k }))} 
          color="#EF6284"
          onRemove={(value) =>
            removeKeyword({ channelId, keyword: value })
          }
        />
			</FilteringKey>
			<FilteringText>Добавьте стоп-слова, чтобы исключить нежелательные новости по заголовкам. <br />
				В Telegram-каналах и группах/пабликах VK стоп-слова применяются<br />
				<mark> ко всему содержанию.</mark></FilteringText>
			<FilteringKey>
				<InputPlus 
          title="стоп-слова" 
          placeholder="Введите ключевое слово" 
          bg="#2B243C" 
          color="#FF55AD"
          value={stopword}
          onChange={setStopword}
          onSubmit={() => {
            addStopword({ channelId, stopword });
            setStopword("");
          }}
        />
				<BlocksItems 
          items={channel.stopWords.map((w) => ({ value: w }))} 
          color="#EF6284" 
          onRemove={(value) =>
            removeStopword({ channelId, stopword: value })
          }
        />
			</FilteringKey>
		</FilteringContainer>
	)
}

const FilteringContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const FilteringText = styled.p`
  color: #6A7080;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  mark {
    color: #D6DCEC;
  }
  &:nth-of-type(2) {
    margin-top: 48px;
  }
`
const FilteringKey = styled.div`
  margin-top: 40px;
`

export default FilteringPopup