import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// library.add(faArrowUp, faArrowRight, faArrowDown, faArrowLeft)

import lottie from "lottie-web"
import { defineElement } from "lord-icon-element"
import { useEffect, useState } from "react"
import { useMap } from "../context/MapContext"

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)

function isDecimal(num) {
	return (num ^ 0) !== num / 1
}

const Controller = ({ linearControls, prev, setPrev, totalSlides, disabled, btnClicked, verticalSlides, setBtnClicked, uiColor }) => {
	const { map, setMap, slide, setSlide, setCurrentVerticalSlide, currentVerticalSlide } = useMap()
	const [vStart, setVStart] = useState(0)

	useEffect(() => {
		!isDecimal(slide) ? setSlide(Math.floor(slide)) : setSlide(slide)
	}, [slide])

	totalSlides = Math.max(...map)

	const isLeftArrowDisabled = () => {
		return slide <= 1
	}
	const isRightArrowDisabled = () => {
		// end result "false" means it will show the arrow
		// linear controls true means that it will hide the arrow if a vertical slide is available
		return (
			(linearControls && map.includes(Math.round((parseFloat(slide) + 0.1) * 1e12) / 1e12)) ||
			Math.round((parseFloat(slide) + 1) * 1e12) / 1e12 >= totalSlides
		)
	}
	const isUpArrowDisabled = () => {
		return !map.includes(Math.round((parseFloat(slide) - 0.1) * 1e12) / 1e12)
	}
	const isDownArrowDisabled = () => {
		return !map.includes(Math.round((parseFloat(slide) + 0.1) * 1e12) / 1e12)
	}

	const handleArrowClick = (delta) => {
		if (!isDecimal(slide)) {
			setSlide(Math.floor(slide))
		}

		if ((slide === 1 || slide === "1.0" || (isDecimal(slide) && Math.floor(slide) === 1)) && (delta === -1 || delta === "-v1")) {
			if (isDecimal(slide) && Math.floor(slide) === 1) {
				window.scrollTo({
					top: 0,
				})
				setSlide((slide) => (parseFloat(slide) - 0.1).toFixed(1))
			} else {
				setSlide(1)
				return
			}
		} else if (Math.floor(parseFloat(slide)) >= totalSlides && delta === 1) {
			if (Math.floor(parseFloat(slide)) >= totalSlides) {
				setSlide(Math.floor(totalSlides).toFixed(1))
				return
			} else {
				return
			}
		} else if (delta === "v1") {
			const scrollAmount = Math.floor((window.scrollY + window.innerHeight) / window.innerHeight) * window.innerHeight
			if (parseFloat(slide) > totalSlides) {
				setSlide(Math.floor(totalSlides))
				return
			} else {
				// setSlide((Slide) => (parseFloat(Slide) + 0.1).toFixed(1))
				// Update the currentSlide index when entering a vertical slide
				if (verticalSlides && map.includes(slide)) {
					// const verticalSlideIndex = map.indexOf(slide)
					// console.log(verticalSlideIndex)
					console.log("down")
					setCurrentVerticalSlide(currentVerticalSlide + 1)
					console.log(currentVerticalSlide)
				}

				// Scroll vertically by 100vh when "down" arrow is clicked
				window.scrollTo({
					// round to the nearest 100vh before adding window.innerHeight
					top: scrollAmount,
					behavior: "smooth",
				})
			}
		} else if (delta === "-v1") {
			// setSlide((Slide) => (parseFloat(Slide) - 0.1).toFixed(1))
			const scrollAmount = Math.floor((window.scrollY - window.innerHeight) / window.innerHeight) * window.innerHeight
			// Scroll vertically by -100vh when "up" arrow is clicked
			if (verticalSlides && map.includes(slide)) {
				console.log("up")
				// const verticalSlideIndex = map.indexOf(slide)
				setCurrentVerticalSlide(currentVerticalSlide - 1) // Move to the previous slide within the vertical slide
			}

			window.scrollTo({
				top: scrollAmount,
				behavior: "smooth",
			})
		} else if (slide >= 1 && slide <= totalSlides) {
			if (parseFloat(slide) + delta > totalSlides) {
				window.scrollTo({
					top: 0,
				})
				setSlide(Math.floor(totalSlides))
				return
			} else if (delta === 1) {
				window.scrollTo({
					top: 0,
				})
				setSlide(Math.floor(parseFloat(slide)) + delta)
			} else if (delta === -1) {
				window.scrollTo({
					top: 0,
				})
				setSlide(Math.ceil(parseFloat(slide)) + delta)
			}
		} else {
			//error
			console.log(slide, delta, totalSlides)
			console.log("disabled")
		}
	}
	useEffect(() => {
		setPrev(slide)
	}, [slide])

	return (
		<div className="controller-container fixed text-4xl  p-1 w-[5.8rem] h-28 left-auto right-6 top-auto bottom-4">
			<div className={`relative h-full w-full text-sky-500 justify-center items-center flex content-center select-none`}>
				<div
					className={` ${
						!verticalSlides
							? "opacity-0 h-0 w-0 "
							: "vertical justify-between flex flex-col absolute h-full w-fit mx-auto align-middle -ml-0.5"
					} `}>
					<button
						className={`active:scale-100 active:duration-0 bg-transparent border-none up hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
							isUpArrowDisabled(parseFloat(slide).toFixed(1))
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
									: "opacity-0 pointer-events-none" // disabled set to hidden
								: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
						}`}
						disabled={isUpArrowDisabled(parseFloat(slide).toFixed(1))}
						onClick={() => {
							setBtnClicked("up")
							handleArrowClick("-v1")
						}}>
						<FontAwesomeIcon
							icon={faChevronUp}
							className={
								isUpArrowDisabled(slide)
									? disabled === "50Percent"
										? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
										: "opacity-0 " // disabled set to hidden
									: "cursor-pointer opacity-100 text-sky-500 duration-300 hover:-translate-y-0.5  ease-in-out transition-all hover:text-sky-400 active:scale-100"
							}
						/>
						<div className={`arrow-up ${slide === 0 ? "text-gray-500/10" : "text-sky-500"}`} />
					</button>
					<button
						className={`active:scale-100 active:duration-0 bg-transparent border-none down hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
							isDownArrowDisabled(parseFloat(slide).toFixed(1))
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
									: "opacity-0 pointer-events-none" // disabled set to hidden
								: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
						}`}
						disabled={isDownArrowDisabled(parseFloat(slide).toFixed(1))}
						onClick={() => {
							setBtnClicked("down")
							handleArrowClick("v1")
						}}>
						<FontAwesomeIcon
							icon={faChevronDown}
							className={
								isDownArrowDisabled(parseFloat(slide).toFixed(1))
									? disabled === "50Percent"
										? "opacity-50 cursor-not-allowed bg-gray-500/10 h-0 w-0 ml-96" // disabled set to 50% opacity
										: "opacity-0 " // disabled set to hidden
									: "opacity-100 cursor-pointer text-sky-500 hover:translate-y-0.5 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
							}
						/>
						<div className={`arrow-down ${slide === totalSlides ? "text-gray-500/10" : "text-sky-500"}`} />
					</button>
				</div>
				<div className="horizontal justify-between pointer-events-none flex absolute h-full w-full my-auto align-middle items-center mb-2 mt-1.5">
					{/* Left Arrow */}
					<button
						className={`active:scale-100 active:duration-0 bg-transparent border-none left w-fit pointer-events-auto hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
							isLeftArrowDisabled(parseFloat(slide).toFixed(1))
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
									: "opacity-0 pointer-events-none" // disabled set to hidden
								: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
						}`}
						disabled={isLeftArrowDisabled(parseFloat(slide).toFixed(1))}
						onClick={() => {
							setBtnClicked("left")
							handleArrowClick(-1)
						}}>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className={
								isLeftArrowDisabled(parseFloat(slide).toFixed(1))
									? disabled === "50Percent"
										? "opacity-50 cursor-not-allowed bg-gray-500/10 h-0 w-0 ml-96" // disabled set to 50% opacity
										: "opacity-0 " // disabled set to hidden
									: "opacity-100 cursor-pointer text-sky-500 hover:-translate-x-0.5 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
							}
						/>
						<div className="arrow-left" />
					</button>
					{/* Right Arrow */}
					<button
						className={`active:scale-100 active:duration-0 bg-transparent border-none right w-fit hover:translate-x-0.5 hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
							isRightArrowDisabled(parseFloat(slide).toFixed(1))
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
									: "opacity-0 pointer-events-none" // disabled set to hidden
								: "opacity-100 pointer-events-auto"
						}`}
						disabled={isRightArrowDisabled(parseFloat(slide).toFixed(1))}
						onClick={() => {
							setBtnClicked("right")
							handleArrowClick(1)
						}}>
						<FontAwesomeIcon
							icon={faChevronRight}
							className={
								isRightArrowDisabled(slide)
									? disabled === "50Percent"
										? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
										: "opacity-0 pointer-events-none" // disabled set to hidden
									: "cursor-pointer opacity-100 text-sky-500 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
							}
						/>
						<div className="arrow-right" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Controller
