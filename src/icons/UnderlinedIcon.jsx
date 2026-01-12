import React, { useState } from 'react'

const UnderlinedIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 18, height = 22, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const currentColor = isHovered ? hoverColor : color

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 22"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <text
        x="2"
        y="14"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fill={currentColor}
      >
        U
      </text>

      <line
        x1="0"
        y1="18"
        x2="18"
        y2="18"
        stroke={currentColor}
        strokeWidth="2"
      />
    </svg>
  )
}

export default UnderlinedIcon
