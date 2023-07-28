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

				// Calculate the newMax by adding 0.1 to the maximum value
				const newMax = max + 0.1

				// Push the filteredSlides array to the vSlideArray
				vSlideArray.push(...filteredSlides)

				// Push the newMax as a number (not a string) to the vSlideArray
				vSlideArray.push(parseFloat(newMax.toFixed(1)))

				// Store the parentId and newMax in the map for future reference
				processedParentIds.get(parentId).push(newMax)
			}
		} else {
			// If parentId has been processed before, get its previous newMax value
			const previousMax = Math.max(...processedParentIds.get(parentId))
			const newMax = previousMax + 0.1
			vSlideArray.push(parseFloat(newMax.toFixed(1)))

			// Update the parentId entry in the map with the newMax value
			processedParentIds.get(parentId).push(newMax)
		}
	})

	const uniqueMergedArray = Array.from(new Set([...vSlideArray, ...noCollection])).sort((a, b) => a - b)
	return uniqueMergedArray
}
