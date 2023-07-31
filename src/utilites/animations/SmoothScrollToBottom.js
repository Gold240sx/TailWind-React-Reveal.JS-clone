export const ScrollToSmooth = (targetY, duration) => {
	const startY = window.scrollY
	const distance = targetY - startY
	let startTime = null

	const step = (timestamp) => {
		if (!startTime) startTime = timestamp
		const progress = timestamp - startTime
		const percentage = Math.min(progress / duration, 1)
		const easing = easeOutQuad(percentage)
		window.scrollTo(0, startY + distance * easing)

		if (progress < duration) {
			requestAnimationFrame(step)
		}
	}

	const easeOutQuad = (t) => t * (2 - t)

	requestAnimationFrame(step)
}
