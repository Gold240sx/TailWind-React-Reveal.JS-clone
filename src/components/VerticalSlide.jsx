import { Children, useState, useEffect } from "react"
import { useMap } from "../context/MapContext"

const VerticalSlide = ({ children }) => {
	const { map, slide } = useMap()
	const [vSlideHeight, setVSlideHeight] = useState("100vh")

	useEffect(() => {
		// Count the number of times slide is found as a root number in the map array
		const count = map.filter((val) => Math.floor(val) === slide).length

		// Calculate the height based on the number of matches
		const height = Math.max(100 + (count - 1) * 100, 100)
		setVSlideHeight(height)
	}, [map, slide])

	return (
		<div className={`w-full VerticalSlide`} style={{ height: vSlideHeight + "vh" }}>
			{children}
		</div>
	)
}

export default VerticalSlide
