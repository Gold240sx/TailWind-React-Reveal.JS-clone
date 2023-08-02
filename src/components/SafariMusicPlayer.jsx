import React, { useState, useEffect, useRef } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlay, faPause, faForward, faBackward, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { HiFastForward } from "react-icons/hi"
import { HiMiniBackward } from "react-icons/hi2"
import { TbRewindBackward30, TbRewindForward30 } from "react-icons/tb"
import { PiSlidersHorizontalBold } from "react-Icons/pi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import mediaControls from "../assets/icons/media-controls.png"
import tinyAdventure from "../assets/Music/tinyAdventure.mp3"
import tinyAdventureCover from "../assets/Music/covers/tiny-adventure.jpg"
import sunshine from "../assets/Music/sunshine.mp3"
import sunshineCover from "../assets/Music/covers/sunshine.webp"
import positiveWay from "../assets/Music/positiveWay.mp3"
import deer from "../assets/Music/deer.mp3"
import plane from "../assets/Music/plane.mp3"
import positiveWayCover from "../assets/Music/covers/positive-way.jpg"
library.add(faPlay, faPause, faForward, faBackward, faCircleXmark)

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

const SafariMusicPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const [trackNo, setTrackNo] = useState(0)
	const [duration, setDuration] = useState(0)
	const [controlsVisible, setControlsVisible] = useState(false)
	const [key, setKey] = useState(1)
	const audioRef = useRef(new Audio(Playlist[0].source))
	const currentTime = audioRef.current.currentTime

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60)
		const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
		const seconds = Math.floor(secs % 60)
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
		return `${returnedMinutes}:${returnedSeconds}`
	}

	useEffect(() => {
		const audio = audioRef.current

		const handleLoadedMetadata = () => {
			setDuration(Math.floor(audio.duration))
		}

		audio.addEventListener("loadedmetadata", handleLoadedMetadata)

		return () => {
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
		}
	}, [trackNo])

	// Function to load audio as a promise
	useEffect(() => {
		const audio = audioRef.current

		// Load the first song on initial mount
		audio.src = Playlist[trackNo].source

		// Event listener to update progress while audio is playing
		const updateProgress = () => {
			if (isPlaying) {
				const currentTime = audio.currentTime
				const progressPercentage = (currentTime / duration) * 100
				setProgress(progressPercentage)
			}
		}

		audio.addEventListener("timeupdate", updateProgress)

		// Event listener to switch to the next song when the current one ends
		const switchSong = () => {
			if (trackNo === Playlist.length - 1) {
				setTrackNo(0)
			} else {
				setTrackNo((prevTrackNo) => prevTrackNo + 1)
			}
		}

		audio.addEventListener("ended", switchSong)

		return () => {
			audio.removeEventListener("timeupdate", updateProgress)
			audio.removeEventListener("ended", switchSong)
		}
	}, [trackNo, isPlaying])

	useEffect(() => {
		const audio = audioRef.current

		// Handle playback when isPlaying or trackNo changes
		if (isPlaying) {
			audio
				.play()
				.then(() => {
					// Playback started successfully
				})
				.catch((error) => {
					console.error("Error playing audio:", error)
				})
		} else {
			audio.pause()
		}
	}, [isPlaying, trackNo])

	const togglePlay = () => {
		setIsPlaying((prevIsPlaying) => !prevIsPlaying)
	}

	const backThirty = () => {
		const audio = audioRef.current
		const currentTime = audio.currentTime
		audio.currentTime = Math.max(currentTime - 30, 0)
	}

	const forwardThirty = () => {
		const audio = audioRef.current
		const currentTime = audio.currentTime
		audio.currentTime = Math.min(currentTime + 30, audio.duration)
	}

	const playLastSong = () => {
		console.log(progress)
		if (progress > 3) {
			audioRef.current.currentTime = 0
		} else if (trackNo == 0) {
			console.log("back to the end of the mix")
			setTrackNo(Playlist.length - 1) // Play the next song
		} else {
			console.log("back a song")
			setTrackNo((prevTrackNo) => prevTrackNo - 1) // Play the next song
		}
	}
	const playNextSong = () => {
		if (trackNo === Playlist.length - 1) {
			setTrackNo(0) // Restart the playlist if the last song ends
		} else {
			setTrackNo((prevTrackNo) => prevTrackNo + 1) // Play the next song
		}
	}

	return (
		<div className="fixed items-center flex m-0 align-bottom select-none left-8 bottom-[2rem] h-12 my-2 hover:w-[310px] delay-700 group/mediaPlayer transition-all duration-700 ease-in-out">
			<div className="absolute flex items-center justify-center w-0 h-full pt-1 overflow-hidden text-left align-middle transition-all duration-300 ease-in-out rounded-l-none bg-black/60 group-hover/mediaPlayer:w-3/4 left-10 rounded-3xl">
				{!controlsVisible && (
					<img
						src={mediaControls}
						onClick={() => setControlsVisible(true)}
						className="w-10 h-10 mb-2 ml-5 opacity-50 cursor-pointer grayscale hover:grayscale-0 hover:opacity-100"
					/>
				)}
				{controlsVisible && (
					<svg
						id="Layer_1"
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						onClick={() => setControlsVisible(false)}
						className="w-10 h-10 mb-2 ml-5 cursor-pointer fill-white hover:fill-red-400 opacity-20 hover:opacity-100">
						<path
							className="cls-1"
							d="m10,0C4.48,0,0,4.48,0,10s4.48,10,10,10,10-4.48,10-10S15.52,0,10,0Zm5.35,13.46c.45.52.39,1.31-.14,1.76-.47.4-1.15.4-1.62,0l-3.53-3.53-3.53,3.53c-.45.52-1.23.58-1.76.14-.52-.45-.58-1.23-.14-1.76.04-.05.09-.09.14-.14l3.53-3.53-3.53-3.53c-.45-.52-.39-1.31.14-1.76.47-.4,1.15-.4,1.62,0l3.53,3.53,3.53-3.53c.52-.45,1.31-.39,1.76.14.4.47.4,1.15,0,1.62l-3.53,3.53,3.53,3.53Z"
						/>
					</svg>
				)}
				{controlsVisible && (
					<div className={` group/mediaControls relative w-full h-full flex justify-evenly opacity-20 mb-1 hover:opacity-100`}>
						<HiMiniBackward
							onClick={playLastSong}
							className="w-8 h-8 mt-1 cursor-pointer hover:text-sky-300 media-control-btn "
						/>
						<TbRewindBackward30
							onClick={backThirty}
							className="w-8 h-8 mt-1 cursor-pointer hover:text-sky-300 media-control-btn "
						/>
						<div
							className={`${
								controlsVisible ? "" : "translate-y-0 translate-x-0"
							} fixed items-end h-full text-2xl translate-x-2 -translate-y-[27px] pt-auto pointer-events-none select-none`}>
							<div
								className={`${
									controlsVisible ? "group-hover/mediaPlayer:opacity-100" : "opacity-0"
								}  opacity-0 font-black text-black/60 transition-all duration-100 ease-in-out top-1 whitespace-nowrap flex`}>
								{/* {currentTime.toFixed(0)} % */}
								{duration.toFixed(0)}
								{/* {calculateTime(currentTime)} <p className="-translate-y-1">/</p>
								{calculateTime(duration)} */}
							</div>
						</div>
						<TbRewindForward30
							onClick={forwardThirty}
							className="w-8 h-8 mt-1 cursor-pointer hover:text-sky-300 media-control-btn "
						/>
						<HiFastForward
							onClick={playNextSong}
							className="w-8 h-8 mt-1 cursor-pointer hover:text-sky-300 media-control-btn "
						/>
					</div>
				)}
				<div className="flex-col mb-2 ml-2">
					{!controlsVisible && (
						<h1 className="text-sm text-white transition-all duration-150 ease-in delay-150 opacity-0 overflow-ellipsis group-hover/mediaPlayer:opacity-100 whitespace-nowrap">
							{Playlist[trackNo].title}
						</h1>
					)}
					{!controlsVisible && (
						<p className="text-xs font-bold transition-all duration-150 ease-in delay-150 opacity-0 text-slate-400 overflow-ellipsis group-hover/mediaPlayer:opacity-100 whitespace-nowrap">
							{Playlist[trackNo].artist}
						</p>
					)}
					<audio ref={audioRef} key={key} src={Playlist[trackNo].source} />
					<div className="absolute bottom-0 left-0 flex w-full h-1 bg-gray-500">
						<div className="h-full bg-sky-500" style={{ width: `${progress}%` }}></div>
						<div
							className={`${
								controlsVisible ? "group-hover/mediaPlayer:opacity-100" : "opacity-0"
							}  opacity-0 duration-900 ease-out transition-opacity z-10 w-[100%]`}>
							<div
								className={`fixed w-3 -translate-y-1 h-3 overflow-visible rounded-full bg-sky-300 hover:scale-150 cursor-pointer`}></div>
						</div>
					</div>
					{/* <audio ref={audioRef} key={key} onEnded={handleEnded} src={Playlist[trackNo].source} /> */}
				</div>
				{!controlsVisible && (
					<div className="ml-auto mb-1 mr-[7px] p-0 overflow-hidden transition-all duration-150 ease-in delay-150 rounded-full opacity-0 w-9 h-9 album-art group-hover/mediaPlayer:opacity-100">
						<img src={Playlist[trackNo].cover} alt="Album cover" className="aspect-square " />
					</div>
				)}
			</div>

			<div
				className="z-20 flex items-center justify-center w-12 h-12 text-center transition-all duration-150 ease-in-out scale-125 border-2 rounded-full cursor-pointer aspect-square text-zinc-700 hover:text-white border-zinc-600 bg-zinc-800 hover:bg-zinc-900"
				onClick={togglePlay}>
				{!isPlaying && <FontAwesomeIcon icon={faPlay} className="ml-1 text-2xl transition-all duration-75 ease-in-out" />}
				{isPlaying && <FontAwesomeIcon icon={faPause} className="text-3xl mr-0.5 duration-75 ease-in-out transition-all" />}
			</div>
		</div>
	)
}

export default SafariMusicPlayer
