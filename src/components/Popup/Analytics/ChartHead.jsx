import { useState, useEffect } from "react";
import styled from "styled-components";
import CustomSelect from "@/shared/CustomSelect";

import { useAnalyticsFilterStore } from "@/store/analyticsFilterStore";

const mapFilterToValue = (filter) => {
  switch(filter){
    case "24h": return "";
    case "7d": return "7";
    case "30d": return "30";
    case "year": return "year";
    default: return "";
  }
};
const mapValueToFilter = (value) => {
  switch(value){
    case "": return "24h";
    case "7": return "7d";
    case "30": return "30d";
    case "year": return "year";
    default: return "";
  }
};

const ChartHead = () => {
  const filter = useAnalyticsFilterStore(state => state.selectedFilter);
  const setFilter = useAnalyticsFilterStore(state => state.setSelectedFilter);

  const [selectedValue, setSelectedValue] = useState(mapFilterToValue(filter));

  useEffect(() => {
    setSelectedValue(mapFilterToValue(filter));
  }, [filter]);

  const handleChange = (option) => {
    setSelectedValue(option.value);
    setFilter(mapValueToFilter(option.value));
  };

  return (
    <HeadContainer>
      <CustomSelect
        placeholder="Уточнить"
        value={selectedValue}
        options={[
          { value: "", label: "За 24 часа" },
          { value: "7", label: "За неделю" },
          { value: "30", label: "За месяц" },
          { value: "year", label: "За год" },
        ]}
        onChange={handleChange}
        width="165px"
        fs="14px"
      />
    </HeadContainer>
  );
};

const HeadContainer = styled.div`
  display:flex;
  justify-content:space-between;
  gap:20px;
  padding:0 56px 30px;
  margin-bottom:40px;
  @media(max-width:1600px){padding:0 32px 30px;}
  @media(max-width:768px){padding:0 24px 30px;}
`;

export default ChartHead;
