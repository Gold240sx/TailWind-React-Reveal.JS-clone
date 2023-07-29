import React, { useState, useEffect } from "react"
import { Mapper } from "./utilites/Mapper"
import ProgressBar from "./components/progressBar"
import Controller from "./components/Controller"
import Slides from "./components/Slides"
import { motion, AnimatePresence } from "framer-motion"
import MusicPlayer from "./components/MusicPlayer"

function App() {
	const [prev, setPrev] = useState(0)
	const [slide, setSlide] = useState(1)
	const [totalSlides, setTotalSlides] = useState(Slides.length)
	const [btnClicked, setBtnClicked] = useState("load")
	const [map, setMap] = useState(
		Slides.map((slides, index) => {
			return parseFloat(index + 1).toFixed(0)
		})
	)

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

	useEffect(() => {
		// Create map array of all slides. (horizontal slides as whole numbers and
		// vertcal slide children as decimals)
		//This defines the boundaries of controls and progress bar
		setMap(Mapper(map))
		// console.log(map) Preview only - may result in unloaded state.
	}, [])

	return (
		<>
			<div className="flex justify-center w-screen h-screen max-h-screen p-0 m-0 overflow-y-hidden text-center">
				<div className={`relative h-full pres-container w-full p-0 m-0 `}>
					{Slides.map((SlideContainer, index) => {
						return (
							<motion.div
								key={slide.id}
								id={index + 1}
								initial={{
									opacity: 0,
									translateX: translation(),
								}}
								animate={
									index === slide - 1
										? {
												opacity: 1,
												translateX: "0",
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
