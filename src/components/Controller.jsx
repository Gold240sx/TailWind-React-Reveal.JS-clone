import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// library.add(faArrowUp, faArrowRight, faArrowDown, faArrowLeft)

import lottie from "lottie-web"
import { defineElement } from "lord-icon-element"
import { useEffect, useState } from "react"

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)

const Controller = ({ slide: Slide, setSlide, prev, setPrev, totalSlides, disabled, btnClicked, setBtnClicked, uiColor }) => {
	const isLeftArrowDisabled = () => {
		return Slide <= 1
	}
	const isRightArrowDisabled = () => {
		return Slide === totalSlides
	}
	const handleArrowClick = (delta) => {
		if (Slide === 1 && delta === -1) {
			return
		} else if (Slide === totalSlides && delta === 1) {
			return
		} else if (Slide >= 1 && Slide <= totalSlides) {
			setSlide(Slide + delta)
		} else {
			console.log(Slide, delta, totalSlides)
			console.log("disabled")
		}
	}
	useEffect(() => {
		console.log("prev, slide", prev, Slide)
		setPrev(Slide)
		console.log("btnClicked", btnClicked)
	}, [Slide])

	return (
		<div className="controller-container absolute text-4xl  p-1 w-[5.8rem] h-28 left-auto right-4 top-auto bottom-4">
			<div className={`relative h-full w-full text-sky-500 justify-center items-center flex content-center select-none`}>
				{/* <div className="vertical justify-between flex flex-col absolute h-full w-fit mx-auto align-middle -ml-0.5">
					<div
						className={`top cursor-pointer hover:bg-gradient-radial from-black/60 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
							Slide === 0
								? "opacity-50 cursor-not-allowed bg-gray-500/10"
								: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
						}`}
						onClick={() => handleArrowClick(-1)}>
						<FontAwesomeIcon
							icon={faChevronUp}
							className={`text-current ${
								Slide === 0 ? "text-gray-500/10" : "text-sky-500"
							} hover:-translate-y-1 duration-300 ease-in-out transition-all `}
						/>
						<div className={`arrow-up ${Slide === 0 ? "text-gray-500/10" : "text-sky-500"}`} />
					</div>
					<div
						className={`bottom cursor-pointer hover:bg-gradient-radial from-black/60 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 duration-300 ease-in-out transition-all ${
							Slide === totalSlides
								? "opacity-50 cursor-not-allowed bg-gray-500/10"
								: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
						}`}
						onClick={() => handleArrowClick(1)}>
						<FontAwesomeIcon
							icon={faChevronDown}
							className={`text-current ${
								Slide === totalSlides ? "text-gray-500/10" : "text-sky-500"
							} hover:translate-y-1 duration-300 ease-in-out transition-all`}
						/>
						<div className={`arrow-down ${Slide === totalSlides ? "text-gray-500/10" : "text-sky-500"}`} />
					</div>
				</div> */}
				<div className="horizontal justify-between pointer-events-none flex absolute h-full w-full my-auto align-middle items-center mb-2 mt-1.5">
					<div
						className={`left w-fit pointer-events-auto hover:bg-gradient-radial from-black/60 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
							isLeftArrowDisabled(Slide)
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
									: "opacity-0 " // disabled set to hidden
								: "opacity-100 cursor-pointer text-sky-500 hover:text-sky-400"
						}`}
						disabled={isLeftArrowDisabled(Slide)}
						onClick={() => {
							handleArrowClick(-1)
							setBtnClicked("left")
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
					<div
						className={`right w-fit pointer-events-auto hover:translate-x-1 hover:bg-gradient-radial from-black/60 via-transparent to-transparent rounded-full h-fit aspect-square hover:scale-110 hover:mt-0.5 duration-300 ease-in-out transition-all ${
							isRightArrowDisabled(Slide)
								? disabled === "50Percent"
									? "opacity-50 cursor-not-allowed bg-gray-500/10" // disabled set to 50% opacity
									: "opacity-0 " // disabled set to hidden
								: "opacity-100 "
						}`}
						disabled={isRightArrowDisabled(Slide)}
						onClick={() => {
							handleArrowClick(1)
							setBtnClicked("right")
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
