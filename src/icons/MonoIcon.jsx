import { useState } from "react"

const MonoIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 20, height = 22, onClick }) => {
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
            <rect x="2" y="1" width="20" height="3" rx="1.5" fill={color ? isHover ? hoverColor : color : "currentColor"} />
            <rect x="2" y="9" width="20" height="3" rx="1.5" fill={color ? isHover ? hoverColor : color : "currentColor"} />
            <rect x="2" y="17" width="20" height="3" rx="1.5" fill={color ? isHover ? hoverColor : color : "currentColor"} />
        </svg>
    );
}

export default MonoIcon;