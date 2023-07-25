import React from "react"
import { motion, AnimatePresence } from "framer-motion"

const ProgressBar = ({ Slide, setSlide, totalSlides, uiColor, pageCounter }) => {
	const percent = (Slide / totalSlides) * 100

	return (
		<div className="fixed bottom-0 w-screen m-0 align-bottom">
			{pageCounter && <p className="ml-auto mr-2 px-1 mb-1.5 bg-black/30 w-fit h-fit rounded">{Slide}</p>}
			<div className="w-full h-1 bg-zinc-300 dark:bg-black/30">
				<div className="h-full transition-all duration-500 ease-in-out bg-sky-500" style={{ width: `${percent}%` }}></div>
			</div>
		</div>
	)
}

export default ProgressBar
