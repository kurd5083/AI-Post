import { useState, useMemo } from "react";
import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";
import { helpDatas } from "@/data/helpDatas";
import useSearchStore from "@/store/searchStore";
import useFadeOnScroll from "@/lib/useFadeOnScroll";

const Help = () => {
  const { fadeVisible, ref } = useFadeOnScroll(20);
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { searchQuery } = useSearchStore();

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return helpDatas;

    const query = searchQuery.toLowerCase().trim();
    return helpDatas.filter(item =>
      item.q.toLowerCase().includes(query) ||
      item.a.toLowerCase().includes(query)
    );
  }, [helpDatas, searchQuery]);
 
  const highlightMatches = (text, query) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Highlight key={index}>{part}</Highlight>
      ) : (
        part
      )
    );
  };
  return (
    <>
      <PageHead />
      <PageFilter
        filter={false}
        placeholder="Поиск по вопросам"
        searchValue={searchQuery}
      />
      <HelpContainer $fadeVisible={fadeVisible} ref={ref}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <HelpItem key={index}>
              <HelpQuestion onClick={() => toggle(index)}>
                <QuestionLeft>
                  <QuestionNum>{index + 1 < 10 ? `0${index + 1}` : index + 1}</QuestionNum>
                  <p>{highlightMatches(item.q, searchQuery)}</p>
                </QuestionLeft>
                <Icon open={openIndex === index}>
                  <ArrowIcon/>
                </Icon>
              </HelpQuestion>
              {openIndex === index && (
                <Answer>
                  {highlightMatches(item.a, searchQuery)}
                </Answer>
              )}
            </HelpItem>
          ))
        ) : (
          <NoResults>
            По запросу "{searchQuery}" ничего не найдено
          </NoResults>
        )}
      </HelpContainer>
    </>
  )
}

const HelpContainer = styled.div`
  position: relative;
  height: calc(100dvh - 360px); 
  overflow-y: auto;
  scrollbar-width: none;
  padding: 0 56px;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
  
  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    margin-left: -24px;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, transparent);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
    transition: opacity 0.2s;
    opacity: ${({$fadeVisible}) => $fadeVisible ? 1 : 0};
    pointer-events: none;
		z-index: 1;
  }
`;
const HelpItem = styled.div`
  border-bottom: 1px solid #1f2a3a;
  padding: 40px 0;
  border-bottom: 2px solid #1C2438;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
`;
const HelpQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;
const QuestionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-weight: 700;
  font-size: 24px;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const QuestionNum = styled.p`
  color: #336CFF;
  font-size: 14px;
`;
const Answer = styled.div`
  margin-top: 24px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  padding-left: 46px;
  color: #6A7080;
  white-space: pre-line;
  max-width: 620px;
  @media (max-width: 480px) {
    padding-left: 0px;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: ${(props) => (props.open ? "#333E59" : "transporent")};
  border: 2px solid ${(props) => (props.open ? "transparent" : "#333E59")};
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.open ? "270deg" : "90deg")});
`;
const Highlight = styled.span`
  background-color: #336CFF33;
  color: #336CFF;
  padding: 2px 4px;
  border-radius: 4px;
`;
const NoResults = styled.div`
  text-align: center;
  padding: 60px 0;
  font-size: 16px;
  color: #6A7080;
  font-size: 16px;
  font-weight: 700;
`;

export default Help
