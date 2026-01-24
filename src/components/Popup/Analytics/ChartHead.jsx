import { useState } from "react";
import styled from "styled-components";

import CustomSelect from "@/shared/CustomSelect";
import CustomSelectSec from "@/shared/CustomSelectSec";

const ChartHead = () => {
	const [dateFilter, setDateFilter] = useState({ period: "2026", value: "" });
	return (
		<HeadContainer>
			<CustomSelectSec
				placeholder="Год"
				value={dateFilter.period}
				options={[
					{ value: "2026", label: "2026" },
					{ value: "2025", label: "2025" },
					{ value: "2024", label: "2024" },
					{ value: "2023", label: "2023" },
				]}
				onChange={(option) =>
					setDateFilter({ period: option.value, value: null })
				}
				width="150px"
				fs="20px"
			/>

			<CustomSelect
				placeholder="Уточнить"
				value={dateFilter.value}
				options={[
					{ value: "", label: "За сутки" },
					{ value: "7", label: "За 7 дней" },
					{ value: "30", label: "За 30 дней" },
				]}
				onChange={(option) =>
					setDateFilter((prev) => ({ ...prev, value: option.value }))
				}
				width="165px"
				fs="14px"
			/>
		</HeadContainer>
	)
}
const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 56px 30px;
  margin-bottom: 40px;

  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { 
    padding: 0 24px 30px; 
  }
`;
export default ChartHead
