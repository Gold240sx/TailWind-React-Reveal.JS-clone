import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faArrowUp,
	faArrowRight,
	faArrowDown,
	faArrowLeft,
	faChevronUp,
	faChevronDown,
	faChevronLeft,
	faChevronRight,
	faHome,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// library.add(faArrowUp, faArrowRight, faArrowDown, faArrowLeft)

import lottie from "lottie-web"
import { defineElement } from "lord-icon-element"
import { useEffect, useState } from "react"
import { useMap } from "../context/MapContext"
import { ScrollToSmooth } from "../utilites/animations/SmoothScrollToBottom"
import { isDecimal } from "../utilites/IsDecimal"
import { progress } from "framer-motion"

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)

const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)

if (isChrome) {
	// console.log(`Chrome InnerHeight: ${window.innerHeight} `)
} else {
	// console.log(`Safari InnerHeight: ${window.innerHeight} `)
}

const Controller = ({ linearControls, setPrev, totalSlides, disabled, verticalSlides, setBtnClicked, uiColor }) => {
	const { map, slide, setSlide, trueSlide, setTrueSlide, setCurrentVerticalSlide, currentVerticalSlide } = useMap()

	const count = map.filter((val) => Math.floor(val) === slide).length

	useEffect(() => {
		// console.log(Math.max(...map))
		!isDecimal(slide) ? setSlide(Math.floor(slide)) : setSlide(slide)
		window.scrollTo({ top: 0 })

		const handleKeyPress = (event) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault()
				handleArrowClick(-1)
			} else if (event.key === "ArrowRight") {
				event.preventDefault()
				handleArrowClick(1)
			}
			// else if (event.key === "ArrowUp") {
			// 	event.preventDefault()
			// 	handleArrowClick("-v1")
			// } else if (event.key === "ArrowDown") {
			// 	event.preventDefault()
			// 	handleArrowClick("v1")
			// }
			//  else if (event.key === "ArrowUp") {
			// 	event.preventDefault()
			// 	if (!isUpArrowDisabled(parseFloat(slide).toFixed(1))) {
			// 		handleArrowClick("-v1")
			// 	} else {
			// 		console.error("Up arrow is disabled.")
			// 	}
			// } else if (event.key === "ArrowDown") {
			// 	event.preventDefault()
			// 	if (!isDownArrowDisabled(parseFloat(slide).toFixed(1))) {
			// 		handleArrowClick("v1")
			// 	} else {
			// 		console.error("Down arrow is disabled.")
			// 		console.log(Math.round((parseFloat(trueSlide) + 1) * 1e12) / 1e12 >= totalSlides)
			// 	}
			// }
			else if (event.key === "r") {
				setSlide(1)
				setCurrentVerticalSlide(0)
			} else if (event.key === "m") {
				// open Map
			} else if (event.key === "a") {
				// sign in as admin (to login screen)
			} else if (event.key === "n") {
				// toggle notifications on/off
			} else if (event.key === "p") {
				// open temporary preferences (permanent prefs might be
				// gotten via a database / local storage)
			}
		}

		document.addEventListener("keydown", handleKeyPress)

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("keydown", handleKeyPress)
		}
	}, [slide])

	totalSlides = Math.max(...map)

	const isLeftArrowDisabled = () => {
		return trueSlide <= 1
	}

	// useEffect(() => {
	// 	console.log("     ")
	// 	console.log("Right arrow will be disabled if: ")
	// 	console.log(
	// 		`linear controls: ${linearControls} + map includes: `,
	// 		Math.round((parseFloat(trueSlide) + 0.1) * 1e12) / 1e12,
	// 		map.includes(Math.floor((parseFloat(trueSlide) + 0.1) * 1e12) / 1e12)
	// 	)
	// 	console.log(
	// 		"or: ",
	// 		Math.round((parseFloat(trueSlide) + 1) * 1e12) / 1e12,
	// 		" (trueSlide + 1) > TotalSlides: ",
	// 		Math.round(((parseFloat(trueSlide.floor) + 1) * 1e12) / 1e12) > totalSlides
	// 	)
	// 	console.log(((Math.floor(parseFloat(trueSlide)) + 1) * 1e12) / 1e12, totalSlides)
	// 	console.log("     ")
	// }, [trueSlide])

	const isRightArrowDisabled = () => {
		return (
			(linearControls && map.includes(Math.round((parseFloat(trueSlide) + 0.1) * 1e12) / 1e12)) ||
			((Math.floor(parseFloat(trueSlide)) + 1) * 1e12) / 1e12 > totalSlides
		)
	}
	const isUpArrowDisabled = () => {
		return !map.includes(Math.round((parseFloat(trueSlide) - 0.1) * 1e12) / 1e12)
	}
	const isDownArrowDisabled = () => {
		// return false
		return !map.includes(Math.round((parseFloat(trueSlide) + 0.1) * 1e12) / 1e12)
	}
	const isHomeIconDisabled = () => {
		return trueSlide !== Math.max(...map)
	}

	const handleArrowClick = (delta) => {
		if (!isDecimal(trueSlide)) {
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
				if (verticalSlides && map.includes(slide)) {
					// setCurrentVerticalSlide(currentVerticalSlide + 1)
				}
				if (isChrome) {
					const floatmatches = map.filter((s) => Math.floor(s) === Math.floor(slide))
					const vSlide = currentVerticalSlide + 1
					const targetSlide = document.getElementById(`${slide}v${vSlide}`)
					// if the current slide is == to the last vertical slide in the map... (override)
					if (Math.round((parseFloat(trueSlide) + 0.1) * 1e12) / 1e12 === Math.max(...floatmatches)) {
						const fullHeight = count * window.innerHeight
						ScrollToSmooth(fullHeight, 1000)
					} else if (targetSlide) {
						console.log(targetSlide)
						targetSlide.scrollIntoView({ behavior: "smooth", block: "end" })
					} else {
						console.log("could not find target slide")
					}
				} else {
					window.scrollTo({
						top: scrollAmount,
						behavior: "smooth",
					})
				}
			}
		} else if (delta === "-v1") {
			const scrollAmount = Math.floor((window.scrollY - window.innerHeight) / window.innerHeight) * window.innerHeight
			if (verticalSlides && map.includes(slide)) {
				// setCurrentVerticalSlide(currentVerticalSlide - 1)
			}

			if (isChrome) {
				const vSlide = currentVerticalSlide - 1
				const targetSlide = document.getElementById(`${slide}v${vSlide}`)
				// Scroll to the target slide smoothly when the "VerticalSlide" component mounts
				if (targetSlide) {
					targetSlide.scrollIntoView({ behavior: "smooth", block: "end" })
				} else {
					console.log("could not find target slide")
				}
			} else {
				window.scrollTo({
					top: scrollAmount,
					behavior: "smooth",
				})
			}
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
				if (isDecimal(trueSlide)) {
					setTrueSlide(Math.ceil(parseFloat(slide)) + delta + 1)
					setSlide(Math.ceil(parseFloat(slide)) + delta + 1)
				} else {
					setSlide(Math.ceil(parseFloat(slide)) + delta)
				}
			}
		} else {
			// error
			console.log(slide, delta, totalSlides)
			console.log("disabled")
		}
	}

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
						className={`${
							linearControls && "opacity-50 hover:opacity-100"
						} active:scale-100 active:duration-0 bg-transparent border-none up hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
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
						className={`${
							linearControls && trueSlide !== Math.max(...map) && "opacity-50 hover:opacity-100"
						} active:scale-100 active:duration-0 bg-transparent border-none left w-fit pointer-events-auto hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
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
				<div className="horizontal justify-between pointer-events-none flex absolute h-full w-full my-auto align-middle items-center mb-2 mt-1.5">
					{/* Left Arrow */}
					<button
						className={`${
							linearControls && trueSlide !== Math.max(...map) && "opacity-50 hover:opacity-100"
						} active:scale-100 active:duration-0 bg-transparent border-none left w-fit pointer-events-auto hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
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
					{/* Home Icon*/}
					<button
						className={`${
							trueSlide === Math.max(...map) ? "opacity-100" : "opacity-0 hidden"
						} active:scale-100 active:duration-0 absolute -right-2 bg-transparent border-none right w-fit hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
							isHomeIconDisabled()
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
									: "opacity-0 pointer-events-none" // disabled set to hidden
								: "opacity-100 pointer-events-auto"
						}`}
						disabled={isHomeIconDisabled()}
						onClick={() => {
							setSlide(1)
							setCurrentVerticalSlide(0)
						}}>
						<FontAwesomeIcon
							icon={faHome}
							className={
								isHomeIconDisabled(slide)
									? disabled === "50Percent"
										? "opacity-50 cursor-not-allowed bg-gray-500/10 pointer-events-none" // disabled set to 50% opacity
										: "opacity-0 pointer-events-none" // disabled set to hidden
									: "cursor-pointer opacity-100 text-zinc-200 bg-black/5 rounded-full p-3 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
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
