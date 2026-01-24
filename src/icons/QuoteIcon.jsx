import { useState } from "react"

const QuoteIcon = ({ color = "#6A7080", hoverColor = "#FFFFFF", width = 20, height = 20, onClick }) => {
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
            <path
                d="M7.5 7C6.67 7 6 7.67 6 8.5V12.5C6 13.33 6.67 14 7.5 14C8.33 14 9 13.33 9 12.5V8.5C9 7.67 8.33 7 7.5 7ZM16.5 7C15.67 7 15 7.67 15 8.5V12.5C15 13.33 15.67 14 16.5 14C17.33 14 18 13.33 18 12.5V8.5C18 7.67 17.33 7 16.5 7Z"
                fill={color ? isHover ? hoverColor : color : "currentColor"}
            />
        </svg>
    )
}

export default QuoteIcon;
