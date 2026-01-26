import { useState } from "react";
import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";
import CustomSelectSec from "@/shared/CustomSelectSec";


const NumberPublicationsPopup = () => {
    const [dateFilter, setDateFilter] = useState({ period: "", value: "" });
  return (
    <div>
        <CustomSelectSec
                        placeholder="Неделя"
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
    </div>
  )
}

export default NumberPublicationsPopup
