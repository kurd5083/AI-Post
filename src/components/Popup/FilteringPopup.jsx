import styled from "styled-components";
import InputPlus from "@/shared/InputPlus";
import BlocksItems from "@/shared/BlocksItems";

const FilteringPopup = () => {
	return (
		<FilteringContainer>
			<FilteringText>Добавьте ключевые слова для фильтрации новостей по заголовкам, или<br />
				оставьте список пустым, чтобы получать все новости. <mark>В Telegram-каналах <br />
					и группах/пабликах VK</mark> поиск осуществляется по всему содержанию.</FilteringText>
			<FilteringKey>
				<InputPlus title="Ключевые слова" placeholder="Введите ключевое слово" bg="#2B243C" color="#FF55AD"/>
				<BlocksItems items={[{value: 'Технологии'}, {value: 'Программирование'}, {value: 'Деньги'}]} color="#EF6284"/>
			</FilteringKey>
			<FilteringText>Добавьте стоп-слова, чтобы исключить нежелательные новости по заголовкам. <br />
				В Telegram-каналах и группах/пабликах VK стоп-слова применяются<br />
				<mark> ко всему содержанию.</mark></FilteringText>
			<FilteringKey>
				<InputPlus title="стоп-слова" placeholder="Введите ключевое слово" bg="#2B243C" color="#FF55AD"  />
				<BlocksItems items={[{value: 'Платный'}, {value: 'Реклама'}, {value: 'Абстракция'}]} color="#EF6284" />
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