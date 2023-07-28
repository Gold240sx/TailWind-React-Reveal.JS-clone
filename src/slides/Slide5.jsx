import React from "react"
import Slide from "../components/Slide.jsx"
import VerticalSlide from "../components/VerticalSlide.jsx"

const Slide5 = () => {
	return (
		<VerticalSlide>
			<Slide className="bg-orange-500">Slide5.0</Slide>
			<Slide className="text-black bg-white">Slide5.1</Slide>
		</VerticalSlide>
	)
}

export default Slide5
