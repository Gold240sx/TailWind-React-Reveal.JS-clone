import React, { useState, useEffect } from "react"
import { useMap } from "./context/MapContext"
import ProgressBar from "./components/progressBar"
import Controller from "./components/Controller"
import Slides from "./components/Slides"
import { motion, AnimatePresence } from "framer-motion"
import MusicPlayer from "./components/MusicPlayer"

function App() {
	const [prev, setPrev] = useState(0)
	const [totalSlides, setTotalSlides] = useState(Slides.length)
	const [btnClicked, setBtnClicked] = useState("load")
	const { map, slide, setSlide } = useMap()
	const [currentSlideCount, setCurrentSlideCount] = useState(1)
	const [currentVerticalSlide, setCurrentVerticalSlide] = useState(0)

	const transition = {
		duration: 0.5,
		ease: "easeInOut",
	}

	const slideshowOptions = {
		pageCounter: true,
		progressBar: true,
		controller: true,
		uiColor: "#42AEF8",
		//  disabled slides cause controls: Either  50% opacity (50Percent) and gray or 0% opacity(hidden),
		disabled: "hidden",
		linearControls: false,
		verticalSlides: true,
		musicPlayer: true,
	}

	const { pageCounter, progressBar, controller, uiColor, disabled, verticalSlides, musicPlayer, linearControls } = slideshowOptions

	const translation = () => {
		if (btnClicked === "load") {
			return "0"
		} else if (btnClicked === "left") {
			return "100%"
		} else if (btnClicked === "right") {
			return "-100%"
		} else if (btnClicked === "up") {
			return
		} else if (btnClicked === "down") {
			return
		}
	}

	function countSlidesWithSameFloatNumber(slide, map) {
		const floatNumber = Math.floor(slide)
		return map.filter((s) => Math.floor(s) === floatNumber).length
	}

	useEffect(() => {
		const count = countSlidesWithSameFloatNumber(slide, map)
		setCurrentSlideCount(count)
	}, [slide, map])

	return (
		<>
			<div className="flex justify-center w-screen h-screen max-h-screen p-0 m-0 text-center">
				<div className={`relative h-full pres-container w-full p-0 m-0 `}>
					{Slides().map((SlideContainer, index) => {
						return (
							<motion.div
								key={index}
								id={index + 1}
								initial={{
									opacity: 0,
									translateX: translation(),
									scale: index + 1 === slide ? 1 : 1 / currentSlideCount, // Set the scale based on the currentSlideCount
								}}
								animate={
									index === slide - 1
										? {
												opacity: 1,
												translateX: "0",
												scale: index + 1 === slide ? 1 : 1 / currentSlideCount, // Set the scale based on the currentSlideCount
										  }
										: {}
								}
								transition={{ transition }}
								exit={{ translateX: translation(), opacity: 0 }}
								className="absolute top-0 w-screen h-screen p-0 m-0">
								{/* Slide container may contain a single Slide or a Vertical Slide, hence a  slide container here */}
								<SlideContainer />
							</motion.div>
						)
					})}
				</div>
				{controller && (
					<Controller
						slide={slide}
						setSlide={setSlide}
						map={map}
						linearControls={linearControls}
						prev={prev}
						setPrev={setPrev}
						btnClicked={btnClicked}
						setBtnClicked={setBtnClicked}
						totalSlides={totalSlides}
						uiColor={uiColor}
						disabled={disabled}
						verticalSlides={verticalSlides}
						className="fixed right-6 bottom-14 w-fit h-fit "
					/>
				)}
				{musicPlayer && <MusicPlayer />}
				{progressBar && (
					<ProgressBar
						Slide={slide}
						setSlide={setSlide}
						totalSlides={totalSlides}
						map={map}
						uiColor={uiColor}
						pageCounter={pageCounter}
					/>
				)}
			</div>
		</>
	)
}

export default App
