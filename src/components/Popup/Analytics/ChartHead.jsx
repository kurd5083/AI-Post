import { useMemo } from "react";
import styled from "styled-components";
import CustomSelect from "@/shared/CustomSelect";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const options = [
  { value: "24h", label: "24 часа" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "year", label: "Год" },
];

const ChartHead = ({ content }) => {
  const filterSelectorMap = {
    subscriptions_day: "dayFilter",
    subscriber_growth: "subscriberFilter",
    dynamics_posts: "adReachFilter",
    publications_analytics: "postsByPeriodFilter",
    average_advertising: "adReachFilter",
    average_coverage: "averageCoverageAvgFilter",
  };

  const setFilterSelectorMap = {
    subscriptions_day: "setDayFilter",
    subscriber_growth: "setSubscriberFilter",
    dynamics_posts: "setAdReachFilter",
    publications_analytics: "setPostsByPeriodFilter",
    average_advertising: "setAdReachFilter",
    average_coverage: "setAverageCoverageAvgFilter",
  };

  const filterKey = filterSelectorMap[content] || "dayFilter";
  const setFilterKey = setFilterSelectorMap[content] || "setDayFilter";
  const filter = useAnalyticsStore(state => state[filterKey]);
  const setFilter = useAnalyticsStore(state => state[setFilterKey]);

  const selectedOption = useMemo(
    () => options.find(opt => opt.value === filter) || options[0],
    [filter]
  );

  const handleChange = (option) => {
    setFilter(option.value);
  };

  return (
    <HeadContainer>
      <CustomSelect
        placeholder="Уточнить"
        value={selectedOption.value}
        options={options}
        onChange={handleChange}
        width="165px"
        fs="14px"
      />
    </HeadContainer>
  );
};

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 56px 30px;
  margin-bottom: 40px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`;

export default ChartHead;
