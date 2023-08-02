import React, { useState, useRef, useEffect } from "react"
// import styles from "../styles/AudioPlayer.module.css"
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import tinyAdventure from "../assets/Music/tinyAdventure.mp3"
import tinyAdventureCover from "../assets/Music/covers/tiny-adventure.jpg"
import sunshine from "../assets/Music/sunshine.mp3"
import sunshineCover from "../assets/Music/covers/sunshine.webp"
import positiveWay from "../assets/Music/positiveWay.mp3"
import positiveWayCover from "../assets/Music/covers/positive-way.jpg"

export const Playlist = [
	{
		id: 1,
		title: "Tiny Adventure",
		artist: "RomanSenykMusic",
		source: tinyAdventure,
		cover: tinyAdventureCover,
	},
	{
		id: 2,
		title: "Sunshine",
		artist: "lemonmusicstudio",
		source: sunshine,
		cover: sunshineCover,
	},
	{
		id: 3,
		title: "Positive Way",
		artist: "Bensound",
		source: positiveWay,
		cover: positiveWayCover,
	},
]

const TruePlayer = ({ timeJump }) => {
	// state
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(0.1)
	const [currentTime, setCurrentTime] = useState(0.01)
	const [trackNo, setTrackNo] = useState(0)

	const chapters = [
		{
			start: 0,
			end: 15,
		},
		{
			start: 60,
			end: 75,
		},
	]

	// references
	const audioPlayer = useRef(new Audio(Playlist[0].source)) // reference our audio component
	const progressBar = useRef() // reference our progress bar
	const animationRef = useRef() // reference the animation

	useEffect(() => {
		if (timeJump) {
			timeTravel(timeJump)
			setIsPlaying(true)
			play()
		} else {
			timeTravel(0)
			setIsPlaying(true)
		}
	}, [timeJump])

	useEffect(() => {
		const seconds = Math.floor(audioPlayer.current.duration)
		if (!isNaN(seconds)) {
			// audio player has successfully calculated the song duration
			setDuration(seconds)
		} else {
			// audio player has yet to load the song.
		}
		progressBar.current.max = seconds
	}, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState, audioPlayer])

	useEffect(() => {
		if (currentTime == duration) {
			togglePlayPause()
			timeTravel(0)
		}
	}, [currentTime])

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60)
		const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
		const seconds = Math.floor(secs % 60)
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
		return `${returnedMinutes}:${returnedSeconds}`
	}

	const play = () => {
		audioPlayer.current.load()
		audioPlayer.current.play()
		animationRef.current = requestAnimationFrame(whilePlaying)
	}

	const togglePlayPause = () => {
		const prevValue = isPlaying
		setIsPlaying(!prevValue)
		if (!prevValue) {
			play()
		} else {
			audioPlayer.current.pause()
			cancelAnimationFrame(animationRef.current)
		}
	}

	const whilePlaying = () => {
		progressBar.current.value = audioPlayer.current.currentTime
		changePlayerCurrentTime()
		animationRef.current = requestAnimationFrame(whilePlaying)
	}

	const changeRange = () => {
		audioPlayer.current.currentTime = progressBar.current.value
		changePlayerCurrentTime()
	}

	const changePlayerCurrentTime = () => {
		progressBar.current.style.setProperty("--seek-before-width", `${(progressBar.current.value / duration) * 100}%`)
		setCurrentTime(progressBar.current.value)
	}

	const backThirty = () => {
		timeTravel(Number(progressBar.current.value) - 30)
	}

	const forwardThirty = () => {
		timeTravel(Number(progressBar?.current.value) + 30)
	}

	const timeTravel = (newTime) => {
		progressBar.current.value = newTime
		changeRange()
	}

	// Event listener to switch to the next song when the current one ends
	const switchSong = () => {
		console.log("SwitchSong activated")
		if (trackNo === Playlist.length - 1) {
			setTrackNo(0) // Restart the playlist if the last song ends
		} else {
			setTrackNo((prevTrackNo) => prevTrackNo + 1) // Play the next song
		}
	}

	// Event listener to check if the current song has ended
	const handleTimeUpdate = () => {
		if (audioPlayer.current.currentTime >= audioPlayer.current.duration) {
			switchSong() // The song has ended, switch to the next one
		}
	}

	useEffect(() => {
		// Add the 'timeupdate' event listener when the component mounts
		audioPlayer.current.addEventListener("timeupdate", handleTimeUpdate)

		// Clean up the event listener when the component unmounts
		return () => {
			audioPlayer.current.removeEventListener("timeupdate", handleTimeUpdate)
		}
	}, [])

	return (
		<div>
			<audio ref={audioPlayer} src={Playlist[trackNo].source} preload="auto"></audio>
			<button onClick={backThirty}>
				<BsArrowLeftShort />
			</button>
			<button onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
			<button onClick={forwardThirty}>
				30 <BsArrowRightShort />
			</button>

			{/* current time */}
			<div>{calculateTime(currentTime)}</div>

			{/* progress bar */}
			<div>
				<input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />
				{chapters.map((chapter, i) => {
					// const leftStyle = (chapter.start / duration) * 100
					// const widthStyle = ((chapter.end - chapter.start) / duration) * 100
					return (
						<div
							key={i}
							className={``}
							style={
								{
									// "--left": `${leftStyle}%`,
									// "--width": `${widthStyle}%`,
								}
							}></div>
					)
				})}
			</div>

			{/* duration */}
			<div>{duration && !isNaN(duration) && calculateTime(duration)}</div>
		</div>
	)
}

export default TruePlayer
