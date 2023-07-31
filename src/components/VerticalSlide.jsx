import { useEffect } from "react"
import { useMap } from "../context/MapContext"

const VerticalSlide = ({ children }) => {
	const { trueSlide, setTrueSlide, slide, vertScroll, setCurrentVerticalSlide } = useMap()

	// console.log({ vertScroll })
	const setSlideIds = () => {
		const verticalSlides = document.querySelectorAll(".pres-container .VerticalSlide")

		verticalSlides.forEach((verticalSlide) => {
			const parentId = verticalSlide.parentElement.id
			const slideChildren = verticalSlide.querySelectorAll(".Slide")

			slideChildren.forEach((s, index) => {
				const slideId = `${parentId}v${index}`
				s.id = slideId
			})
		})

		// Add event listener to prevent vertical scrolling via mouse wheel if verticalScroll is false
		if (!vertScroll) {
			const handleWheelEvent = (event) => {
				if (event.deltaY !== 0) {
					event.preventDefault()
				}
			}

			const handleTouchStartEvent = (event) => {
				const touchStartY = event.touches[0].clientY

				const handleTouchMoveEvent = (event) => {
					const touchMoveY = event.touches[0].clientY
					const deltaY = touchMoveY - touchStartY

					if (Math.abs(deltaY) > 5) {
						event.preventDefault()
					}
				}

				const handleTouchEndEvent = () => {
					document.removeEventListener("touchmove", handleTouchMoveEvent)
					document.removeEventListener("touchend", handleTouchEndEvent)
				}

				document.addEventListener("touchmove", handleTouchMoveEvent, { passive: false })
				document.addEventListener("touchend", handleTouchEndEvent, { passive: false })
			}

			document.addEventListener("wheel", handleWheelEvent, { passive: false })
			document.addEventListener("touchstart", handleTouchStartEvent, { passive: false })

			return () => {
				document.removeEventListener("wheel", handleWheelEvent)
				document.removeEventListener("touchstart", handleTouchStartEvent)
			}
		}
	}
	const handleScroll = () => {
		if (vertScroll) {
			// Add logic to change trueSlide based on scroll position here
			const slideElements = document.querySelectorAll(".Slide")
			const windowHeight = window.innerHeight
			const currentScrollY = window.scrollY

			let newTrueSlide = null
			let minDistance = Number.MAX_SAFE_INTEGER

			slideElements.forEach((slideElement) => {
				const rect = slideElement.getBoundingClientRect()
				const distance = Math.abs(rect.top)

				if (distance < minDistance && distance <= windowHeight * 0.05) {
					minDistance = distance
					const slideIndex = Array.from(slideElement.parentElement.children).indexOf(slideElement)
					setCurrentVerticalSlide(slideIndex)
					newTrueSlide = `${slideElement.parentElement.id}.${slideIndex + 1}`
				}
			})
		}
	}

	useEffect(() => {
		setSlideIds()

		// Add scroll event listener to handle scrolling changes
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [trueSlide, vertScroll])

	return <div className={`w-full VerticalSlide h-full`}>{children}</div>
}

export default VerticalSlide
