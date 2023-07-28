import React from "react"
import VerticalSlide from "../components/VerticalSlide"
import Slide from "../components/Slide"

const Slide3 = () => {
	return (
		<VerticalSlide>
			<Slide className="bg-orange-500">Slide3.0</Slide>
			<Slide className="text-black bg-white">Slide3.1</Slide>
			<Slide className="text-black bg-slate-200">Slide3.2</Slide>
		</VerticalSlide>
	)
}

export default Slide3
