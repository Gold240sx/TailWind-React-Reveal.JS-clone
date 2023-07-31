import React, { createContext, useState, useContext, useEffect } from "react"
import { Mapper } from "../utilites/Mapper"
import Slides from "../components/Slides"

const MapContext = createContext()

export const useMap = () => {
	const context = useContext(MapContext)
	if (!context) {
		throw new Error("useMap must be used within a MapProvider")
	}
	return context
}

export const MapProvider = ({ children }) => {
	useEffect(() => {
		// Create map array of all slides. (horizontal slides as whole numbers and
		// vertcal slide children as decimals)
		//This defines the boundaries of controls and progress bar
		setMap(Mapper(map))
		// console.log(map) Preview only - may result in unloaded state.
	}, [])

	const [map, setMap] = useState(
		Slides().map((slides, index) => {
			return parseFloat(index + 1).toFixed(0)
		})
	)
	const [slide, setSlide] = useState(1) // Add currentSlide state and set its default value to 1
	const [currentVerticalSlide, setCurrentVerticalSlide] = useState(0)
    const [trueSlide, setTrueSlide] = useState(1)
    const [vertScroll, setVertScroll] = useState()

	useEffect(() => {
		setTrueSlide(parseFloat(`${slide}.${currentVerticalSlide}`))
	}, [slide, currentVerticalSlide])

	useEffect(() => {
		setCurrentVerticalSlide(0)
	}, [slide])

	return (
		<MapContext.Provider
			value={{
				map,
				setMap,
				slide,
				setSlide,
				currentVerticalSlide,
				setCurrentVerticalSlide,
				trueSlide,
				setTrueSlide,
				vertScroll,
				setVertScroll,
			}}>
			{children}
		</MapContext.Provider>
	)
}
