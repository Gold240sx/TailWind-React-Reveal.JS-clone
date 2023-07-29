import { Children, useState } from "react"

const VerticalSlide = ({ children, map }) => {
	const [slideCount, setSlideCount] = useState(0)
	const [vSlideHeight, setVSlideHeight] = useState("100vh")
	// Convert children to an array if it's not already an array

	const refs = document.querySelectorAll(` .VerticalSlide .Slide`)
	const refCount = refs.length

	refs.forEach((ref) => {
		// get parent's parent's id
		const vSlideParent = ref?.parentNode?.parentNode
		console.log(vSlideParent)
		console.log(vSlideParent?.id)
		ref.style.height = "100vh"
		console.log(refCount)
		// vSlide.style.height = "80vh"

		// vSlide.parentNode.classList.remove("overflow-y-hidden")
		// vSlide.parentNode.classList.add("overflow-y-none")
		// vSlide.style.height = "100vh"
	})

	// const slideHeight = childrenArray.length * 100
	// Loop through the children and check if they are divs with className === "slides"
	// childrenArray.forEach((child) => {
	// if (child.props.className === "Slide") {
	// 	count++
	// }
	// console.log(slideHeight)

	return <div className={`w-full h-[${vSlideHeight}vh] VerticalSlide`}>{children}</div>
}

export default VerticalSlide
