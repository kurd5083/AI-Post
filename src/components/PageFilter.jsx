import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import search from "@/assets/search.svg";
import all from "@/assets/media/all.svg";
import marketing from "@/assets/media/marketing.svg";
import training from "@/assets/media/training.svg";
import entertainment from "@/assets/media/entertainment.svg";
import news from "@/assets/media/news.svg";
import promo from "@/assets/media/promo.svg";

const PageFilter = ({ activeFilter, setActiveFilter, placeholder }) => {
  const filterButtons = [
    { id: "all", label: "Все", icon: all },
    { id: "marketing", label: "Маркетинг", icon: marketing },
    { id: "education", label: "Обучение", icon: training },
    { id: "entertainment", label: "Развлечение", icon: entertainment },
    { id: "news", label: "Новости", icon: news },
    { id: "promo", label: "Промо", icon: promo }
  ];

  return (
    <PageFilterContainerWrapper>
      <PageFilterInput 
        type="text" 
        placeholder={placeholder}
        style={{ backgroundImage: `url(/src/assets/search.svg)` }}
      />
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
            <img src={button.icon} alt={`${button.label} icon`} />
            {button.label}
          </BtnBase>
        ))}
      </PageFilterButtons>
    </PageFilterContainerWrapper>
  );
};

const PageFilterContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 0 clamp(0px, calc((100vw - 1600px) * 24 / 400), 24px);
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

  &::placeholder {
    color: #6A7080;
  }
`;

const PageFilterButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export default PageFilter;