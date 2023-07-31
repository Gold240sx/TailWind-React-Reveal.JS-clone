import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMap } from "../context/MapContext"

const ProgressBar = ({ Slide, setSlide, totalSlides, uiColor, pageCounter, map, currentVerticalSlide }) => {
	const { trueSlide } = useMap()
	totalSlides = Math.max(...map)
	const percent = () => {
		return ((trueSlide - 1) / (totalSlides - 1)) * 100
	}

	return (
		<div className="fixed bottom-0 w-screen m-0 align-bottom">
			{pageCounter && <p className="ml-auto mr-2 px-1 mb-1.5 bg-black/30 w-fit h-fit rounded select-none ">{trueSlide}</p>}
			{/* {pageCounter && (
				<p className="fixed bottom-auto px-1 bg-blue-800 rounded pointer-events-none select-none top-10 right-2 w-fit h-fit ">
					{Slide}.{currentVerticalSlide}
				</p>
			)} */}
			<div className="w-full h-1 bg-zinc-300 dark:bg-black/30">
				<div className="h-full transition-all duration-500 ease-in-out bg-sky-500" style={{ width: `${percent()}%` }}></div>
			</div>
		</div>
	)
}

export default ProgressBar
