import { useState } from "react"
import ProgressBar from "./components/progressBar"
import Controller from "./components/Controller"
import Slides from "./components/Slides"
import { motion, AnimatePresence } from "framer-motion"
import { CSSTransition } from "react-transition-group"

const Deck = [
	{ name: "test1", id: 1 },
	{ name: "test2", id: 2 },
	{ name: "test3", id: 3 },
]

function App() {
	const [slide, setSlide] = useState(1)
	const [totalSlides, setTotalSlides] = useState(Deck.length)

	const slideshowOptions = {
		pageCounter: true,
		progressBar: true,
		controller: true,
		uiColor: "#42AEF8",
		//  disabled slides cause controls: Either  50% opacity (50Percent) and gray or 0% opacity(hidden),
		disabled: "hidden",
	}

	const { pageCounter, progressBar, controller, uiColor, disabled } = slideshowOptions

	return (
		<>
			<div className="grid text-center h-screen items-center">
				<div className="slide-container mb-1 relative h-full">
					{Slides.map((Slide, index) => {
						const isCurrent = index === slide - 1

						return (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={isCurrent ? { opacity: 1 } : { opacity: 0 }}
								transition={{ duration: 3 }}
								className={` ${isCurrent ? "h-full" : "h-0"}`}>
								{isCurrent && <Slide className="slide h-full" />}
							</motion.div>
						)
					})}
				</div>
				{controller && (
					<Controller
						slide={slide}
						setSlide={setSlide}
						totalSlides={totalSlides}
						uiColor={uiColor}
						disabled={disabled}
						className="right-6 bottom-14 w-fit h-fit fixed "
					/>
				)}
				{progressBar && (
					<ProgressBar Slide={slide} setSlide={setSlide} totalSlides={totalSlides} uiColor={uiColor} pageCounter={pageCounter} />
				)}
			</div>
		</>
	)
}

export default App
