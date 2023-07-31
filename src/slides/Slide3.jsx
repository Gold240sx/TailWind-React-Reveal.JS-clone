import React from "react"
import VerticalSlide from "../components/VerticalSlide"
import Slide from "../components/Slide"

const Slide3 = () => {
	return (
		<VerticalSlide>
			<Slide>
				<div className="h-full bg-orange-500">Slide3.0</div>
			</Slide>
			<Slide>
				<div className="h-full text-black bg-slate-200">Slide3.1</div>
			</Slide>
			<Slide>
				<div className="h-full text-black bg-white">Slide3.2</div>
			</Slide>
			<Slide>
				<div className="h-full text-black bg-slate-200">Slide3.3</div>
			</Slide>
			<Slide>
				<div className="h-full bg-orange-500">Slide3.4</div>
			</Slide>
		</VerticalSlide>
	)
}

export default Slide3
