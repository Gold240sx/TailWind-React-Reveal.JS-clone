import React from "react"
import Slide from "../components/Slide.jsx"
import VerticalSlide from "../components/VerticalSlide.jsx"

const Slide6 = () => {
	return (
		<VerticalSlide>
			<Slide>
				<div className="h-full bg-teal-500 ">Slide6.0</div>
			</Slide>
			<Slide>
				<div className="h-full text-black bg-white">Slide6.1</div>
			</Slide>
			<Slide>
				<div className="h-full text-black bg-gray-200">Slide6.2</div>
			</Slide>
		</VerticalSlide>
	)
}

export default Slide6
