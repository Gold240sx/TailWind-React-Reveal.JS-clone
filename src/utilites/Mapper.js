import React, { useEffect, useState } from "react"
import Slides from "../components/Slides"

export const Mapper = (collection) => {
	const slides = document.querySelectorAll(".pres-container .VerticalSlide .Slide")

	// Create a new array 'vSlideArray' to store the updated values
	const vSlideArray = []
	const noCollection = collection.map((value) => parseFloat(value))

	// Keep track of processed parentIds and their corresponding max values
	const processedParentIds = new Map()

	slides.forEach((slide) => {
		const parentId = parseFloat(slide.parentElement.parentElement.id)

		// Check if the parentId has already been processed
		if (!processedParentIds.has(parentId)) {
			processedParentIds.set(parentId, [])

			// Find the highest value in the 'collection' array that matches the parentId
			const filteredSlides = noCollection.filter((item) => parseFloat(item) === parentId)

			if (filteredSlides.length > 0) {
				// Find the maximum value within the filteredSlides array
				const max = Math.max(...filteredSlides)

				// Push the filteredSlides array to the vSlideArray
				vSlideArray.push(...filteredSlides)

				// Push the max as a number (not a string) to the vSlideArray
				vSlideArray.push(parseFloat(max.toFixed(1)))

				// Store the parentId and max in the map for future reference
				processedParentIds.get(parentId).push(max)
			}
		} else {
			// If parentId has been processed before, get its previous max value
			const previousMax = Math.max(...processedParentIds.get(parentId))
			const max = previousMax + 0.1
			vSlideArray.push(parseFloat(max.toFixed(1)))

			// Update the parentId entry in the map with the max value
			processedParentIds.get(parentId).push(max)
		}
	})

	const uniqueMergedArray = Array.from(new Set([...vSlideArray, ...noCollection])).sort((a, b) => a - b)
	return uniqueMergedArray
}
