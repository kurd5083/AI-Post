import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import AllIcon from "@/icons/AllIcon";
import MarketingIcon from "@/icons/MarketingIcon";
import TrainingIcon from "@/icons/TrainingIcon";
import EntertainmentIcon from "@/icons/EntertainmentIcon";
import NewsIcon from "@/icons/NewsIcon";
import PromotionIcon from "@/icons/PromotionIcon";
import useSearchStore from "@/store/searchStore";

const PageFilter = ({ activeFilter, setActiveFilter, placeholder, filter = true }) => {
  const { searchQuery, setSearchQuery } = useSearchStore();
    
  const filterButtons = [
    { id: "all", label: "Все", icon: (isActive) => <AllIcon color={isActive ? "#fff" : "#6A7080"}/>, },
    { id: "marketing", label: "Маркетинг", icon: (isActive) => <MarketingIcon color={isActive ? "#fff" : "#6A7080"}/> },
    { id: "education", label: "Обучение", icon: (isActive) => <TrainingIcon color={isActive ? "#fff" : "#6A7080"}/> },
    { id: "entertainment", label: "Развлечение", icon: (isActive) => <EntertainmentIcon color={isActive ? "#fff" : "#6A7080"}/> },
    { id: "news", label: "Новости", icon: (isActive) => <NewsIcon color={isActive ? "#fff" : "#6A7080"}/> },
    { id: "promo", label: "Промо", icon: (isActive) => <PromotionIcon color={isActive ? "#fff" : "#6A7080"}/> }
  ];

  return (
    <PageFilterContainerWrapper>
      <PageFilterInput
        type="text"
        placeholder={placeholder}
        style={{ backgroundImage: `url(/src/assets/search.svg)` }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filter && (
        <PageFilterButtons>
          {filterButtons.map((button) => (
            <BtnBase
              key={button.id}
              $padding="16px 24px"
              $border={activeFilter === button.id ? false : true}
              $bg={activeFilter === button.id ? "#336CFF" : "transparent"}
              $color={activeFilter === button.id ? "#fff" : "#D6DCEC"}
              onClick={() => setActiveFilter(button.id)}
            >
              {button.icon(activeFilter === button.id)}
              {button.label}
            </BtnBase>
          ))}
        </PageFilterButtons>
      )}
    </PageFilterContainerWrapper>
  );
};

const PageFilterContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px 0;
  margin-bottom: 48px;
`;

const PageFilterInput = styled.input`
  background-color: transparent;
  max-width: 330px;
  width: 100%;
  color: #D6DCEC;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2E3954;
  padding-left: 40px;
  background-repeat: no-repeat;
  background-position: 0px 4px;
  background-size: 16px 16px;
  margin-left: 56px;

  @media(max-width: 1600px) {
    margin-left: 32px;
  }
  @media(max-width: 768px) {
    margin-left: 24px;
  }

  &::placeholder {
    color: #6A7080;
  }
`;

const PageFilterButtons = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 56px;
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;

export default PageFilter;