import { useState } from "react"

const ArrowIcon = ({ color, hoverColor = "#FFFFFF", width = 8, height = 14 }) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 8 14"
			fill="none"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.999999 0.999999L7 7L1 13"
				stroke={color ? isHover ? hoverColor : color : "currentColor"}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
	)
}

export default ArrowIcon
