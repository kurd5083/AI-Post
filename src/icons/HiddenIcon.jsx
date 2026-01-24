import { useState } from "react"

const HiddenIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 20, height = 20, onClick }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <svg
            onClick={onClick}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ cursor: "pointer" }}
        >
            <circle cx="6" cy="12" r="2" fill={color ? isHover ? hoverColor : color : "currentColor"} />
            <circle cx="12" cy="12" r="2" fill={color ? isHover ? hoverColor : color : "currentColor"} />
            <circle cx="18" cy="12" r="2" fill={color ? isHover ? hoverColor : color : "currentColor"} />
        </svg>
    )
}


export default HiddenIcon;
