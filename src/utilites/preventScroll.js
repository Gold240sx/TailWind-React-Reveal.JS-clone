//vertScroll (boolean) set in preferences in App. Passed through and taken from MapContext
// ** CURRENTLY UNUSED **
export const preventScroll = (vertScroll) => {
	console.log(vertScroll)
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
