import { useState } from "react";

const ItalicIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 12, height = 22, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 22"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <text
        x="0"   
        y="50%"
        fontFamily="serif"
        fontStyle="italic"
        dominantBaseline="middle"
        fill={isHover ? hoverColor : color}
        fontSize={22}
      >
        I
      </text>
    </svg>
  );
};

export default ItalicIcon;
