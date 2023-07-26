import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// library.add(faArrowUp, faArrowRight, faArrowDown, faArrowLeft)

import lottie from "lottie-web"
import { defineElement } from "lord-icon-element"
import { useEffect, useState } from "react"

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)

		function isDecimal(num) {
			return (num ^ 0) !== num / 1
		}

		const Controller = ({
			slide: Slide,
			setSlide,
			prev,
			setPrev,
			totalSlides,
			disabled,
			btnClicked,
			verticalSlides,
			setBtnClicked,
			uiColor,
		}) => {
			useEffect(() => {
				!isDecimal(Slide) ? setSlide(Math.floor(Slide)) : setSlide(Slide)
			}, [Slide])

			const isLeftArrowDisabled = () => {
				return Slide <= 1
			}
			const isRightArrowDisabled = () => {
				return Slide >= Math.floor(totalSlides)
			}
			const isUpArrowDisabled = () => {
				return Slide <= 1
			}
			const isDownArrowDisabled = () => {
				return Slide >= Math.floor(totalSlides)
			}

			const handleArrowClick = (delta) => {
				// check if integer is 00 or 0 and convert to the whole number
				if (!isDecimal(Slide)) {
					setSlide(Math.floor(Slide))
				}

				if (
					(Slide === 1 || Slide === "1.0" || (isDecimal(Slide) && Math.floor(Slide) === 1)) &&
					(delta === -1 || delta === "-v1")
				) {
					if (isDecimal(Slide) && Math.floor(Slide) === 1) {
						setSlide((Slide) => (parseFloat(Slide) - 0.1).toFixed(1))
					} else {
						setSlide(1)
						return
					}
				} else if (Math.floor(parseFloat(Slide)) >= totalSlides && (delta === 1 || delta === "v1")) {
					if (Math.floor(parseFloat(Slide)) >= totalSlides) {
						setSlide(Math.floor(totalSlides).toFixed(1))
						return
					} else {
						return
					}
				} else if (delta === "v1") {
					if (parseFloat(Slide) > totalSlides) {
						setSlide(Math.floor(totalSlides))
						return
					} else {
						setSlide((Slide) => (parseFloat(Slide) + 0.1).toFixed(1))
					}
				} else if (delta === "-v1") {
					setSlide((Slide) => (parseFloat(Slide) - 0.1).toFixed(1))
				} else if (Slide >= 1 && Slide <= totalSlides) {
					if (parseFloat(Slide) + delta > totalSlides) {
						setSlide(Math.floor(totalSlides))
						return
					} else if (delta === 1) {
						setSlide(Math.floor(parseFloat(Slide)) + delta)
					} else if (delta === -1) {
						setSlide(Math.ceil(parseFloat(Slide)) + delta)
					}
				} else {
					//error
					console.log(Slide, delta, totalSlides)
					console.log("disabled")
				}
			}
			useEffect(() => {
				// console.log("prev, slide", prev, Slide)
				setPrev(Slide)
				// console.log("btnClicked", btnClicked)
			}, [Slide])

			return (
				<div className="controller-container absolute text-4xl  p-1 w-[5.8rem] h-28 left-auto right-6 top-auto bottom-4">
					<div className={`relative h-full w-full text-sky-500 justify-center items-center flex content-center select-none`}>
						<div
							className={` ${
								!verticalSlides
									? "opacity-0 h-0 w-0 "
									: "vertical justify-between flex flex-col absolute h-full w-fit mx-auto align-middle -ml-0.5"
							} `}>
							<div
								className={`up hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
									isUpArrowDisabled(Slide)
										? disabled === "50Percent"
											? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
											: "opacity-0 " // disabled set to hidden
										: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
								}`}
								disabled={isUpArrowDisabled(Slide)}
								onClick={() => {
									setBtnClicked("up")
									handleArrowClick("-v1")
								}}>
								<FontAwesomeIcon
									icon={faChevronUp}
									className={
										isUpArrowDisabled(Slide)
											? disabled === "50Percent"
												? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
												: "opacity-0 " // disabled set to hidden
											: "cursor-pointer opacity-100 text-sky-500 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
									}
								/>
								<div className={`arrow-up ${Slide === 0 ? "text-gray-500/10" : "text-sky-500"}`} />
							</div>
							<div
								className={`down hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
									isDownArrowDisabled(Slide)
										? disabled === "50Percent"
											? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
											: "opacity-0 " // disabled set to hidden
										: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
								}`}
								disabled={isDownArrowDisabled(Slide)}
								onClick={() => {
									setBtnClicked("down")
									handleArrowClick("v1")
								}}>
								<FontAwesomeIcon
									icon={faChevronDown}
									className={
										isDownArrowDisabled(Slide)
											? disabled === "50Percent"
												? "opacity-50 cursor-not-allowed bg-gray-500/10 h-0 w-0 ml-96" // disabled set to 50% opacity
												: "opacity-0 " // disabled set to hidden
											: "opacity-100 cursor-pointer text-sky-500 hover:-translate-x-1 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
									}
								/>
								<div className={`arrow-down ${Slide === totalSlides ? "text-gray-500/10" : "text-sky-500"}`} />
							</div>
						</div>
						<div className="horizontal justify-between pointer-events-none flex absolute h-full w-full my-auto align-middle items-center mb-2 mt-1.5">
							{/* Left Arrow */}
							<div
								className={`left w-fit pointer-events-auto hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
									isLeftArrowDisabled(Slide)
										? disabled === "50Percent"
											? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
											: "opacity-0 " // disabled set to hidden
										: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
								}`}
								disabled={isLeftArrowDisabled(Slide)}
								onClick={() => {
									setBtnClicked("left")
									handleArrowClick(-1)
								}}>
								<FontAwesomeIcon
									icon={faChevronLeft}
									className={
										isLeftArrowDisabled(Slide)
											? disabled === "50Percent"
												? "opacity-50 cursor-not-allowed bg-gray-500/10 h-0 w-0 ml-96" // disabled set to 50% opacity
												: "opacity-0 " // disabled set to hidden
											: "opacity-100 cursor-pointer text-sky-500 hover:-translate-x-1 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
									}
								/>
								<div className="arrow-left" />
							</div>
							{/* Right Arrow */}
							<div
								className={`right w-fit pointer-events-auto hover:translate-x-1 hover:bg-gradient-radial from-black/10 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
									isRightArrowDisabled(Slide)
										? disabled === "50Percent"
											? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
											: "opacity-0 " // disabled set to hidden
										: "opacity-100 "
								}`}
								disabled={isRightArrowDisabled(Slide)}
								onClick={() => {
									setBtnClicked("right")
									handleArrowClick(1)
								}}>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={
										isRightArrowDisabled(Slide)
											? disabled === "50Percent"
												? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
												: "opacity-0 " // disabled set to hidden
											: "cursor-pointer opacity-100 text-sky-500 duration-300 ease-in-out transition-all hover:text-sky-400 active:scale-100"
									}
								/>
								<div className="arrow-right" />
							</div>
						</div>
					</div>
				</div>
			)
		}

export default Controller
