import { useState } from "react";

const FatIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 16, height = 22, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 22"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Montserrat, sans-serif"
        fontSize={22}
        fill={isHover ? hoverColor : color}
      >
        B
      </text>
    </svg>
  );
};

export default FatIcon;
