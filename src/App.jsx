import { useState, useEffect } from "react"
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
	const [prev, setPrev] = useState(0)
	const [slide, setSlide] = useState(1)
	const [totalSlides, setTotalSlides] = useState(Deck.length)
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
	}

	const { pageCounter, progressBar, controller, uiColor, disabled } = slideshowOptions

	return (
		<>
			<div className="grid items-center h-screen text-center">
				<div className={` relative h-full mb-1 slide-container`}>
					{Slides.map((Slide, index) => {
						const isCurrent = index === slide - 1
						return (
							<motion.div
								key={index}
								initial={{
									opacity: 0,
									translateX: btnClicked === "load" ? null : btnClicked === "left" ? "100%" : "-100%",
								}}
								animate={
									isCurrent
										? {
												opacity: 1,
												translateX: btnClicked === "load" ? null : btnClicked === "left" ? "0%" : "0%",
										  }
										: { opacity: 0 }
								}
								transition={{ duration: 0.5, easeInOut: "easeInOut" }}
								exit={{ translateX: btnClicked === "left" ? "100%" : "-100%" }}
								className={` ${isCurrent ? "h-full" : "h-0"}`}>
								<Slide className="h-full slide" />
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
						className="fixed right-6 bottom-14 w-fit h-fit "
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
