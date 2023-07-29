import React from "react"
import Slide from "../components/Slide.jsx"
import VerticalSlide from "../components/VerticalSlide.jsx"

const Slide5 = () => {
	return (
		<VerticalSlide>
			<Slide>
				<div className="h-full bg-teal-500 ">Slide5.0</div>
			</Slide>
			<Slide>
				<div className="h-full text-black bg-white">Slide5.1</div>
			</Slide>
		</VerticalSlide>
	)
}

export default Slide5
