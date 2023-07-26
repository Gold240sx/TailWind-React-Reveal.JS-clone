import { useState, useEffect } from "react"
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
		verticalSlides: true,
		musicPlayer: true,
	}

	const { pageCounter, progressBar, controller, uiColor, disabled, verticalSlides, musicPlayer } = slideshowOptions

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

	return (
		<>
			<div className="flex justify-center w-screen h-screen max-h-screen p-0 m-0 overflow-y-hidden text-center">
				<div className={`relative h-full slide-container w-full p-0 m-0`}>
					{Slides.map((Slide, index) => {
						return (
							<motion.div
								key={slide.id}
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
								className={`absolute top-0  w-screen h-screen  p-0 m-0`}>
								<Slide className="w-full h-full p-0 m-0 slide" />
							</motion.div>
						)
					})}
				</div>
				{controller && (
					<Controller
						slide={slide}
						setSlide={setSlide}
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
					<ProgressBar Slide={slide} setSlide={setSlide} totalSlides={totalSlides} uiColor={uiColor} pageCounter={pageCounter} />
				)}
			</div>
		</>
	)
}

export default App
