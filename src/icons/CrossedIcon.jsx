import { useState } from 'react';

const CrossedIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 16, height = 22, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentColor = isHovered ? hoverColor : color;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <line x1="0" y1="8" x2="18" y2="8" stroke={currentColor} strokeWidth="2" />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="22"
        fill={currentColor}
      >
        S
      </text>
    </svg>
  );
};

export default CrossedIcon;
