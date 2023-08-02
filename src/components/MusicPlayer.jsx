import React, { useState, useEffect, useRef } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import tinyAdventure from "../assets/Music/tinyAdventure.mp3"
import tinyAdventureCover from "../assets/Music/covers/tiny-adventure.jpg"
import positiveWay from "../assets/Music/positiveWay.mp3"
import positiveWayCover from "../assets/Music/covers/positive-way.jpg"
library.add(faPlay, faPause)

export const Playlist = [
	{
		id: 1,
		title: "Tiny Adventure",
		artist: "Bensound",
		source: tinyAdventure,
		cover: tinyAdventureCover,
	},
	{
		id: 2,
		title: "Positive Way",
		artist: "Bensound",
		source: positiveWay,
		cover: positiveWayCover,
	},
]

const MusicPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const [trackNo, setTrackNo] = useState(0)
	const [song, setSong] = useState(Playlist[0].title)
	const [artist, setArtist] = useState(Playlist[0].artist)
	const audioRef = useRef(new Audio(Playlist[0].source))

	useEffect(() => {
		const audio = audioRef.current

		// Event listener to switch to the next song when the current one ends
		audio.addEventListener("ended", () => {
			if (trackNo === Playlist.length - 1) {
				setTrackNo(0)
			} else {
				setTrackNo(trackNo + 1)
				audio.src = Playlist[trackNo].source
			}
		})

		// Clean up the event listener on unmount
		return () => {
			audio.removeEventListener("ended", () => {})
		}
	}, [trackNo]) // Listen for changes to trackNo to trigger the song change

	useEffect(() => {
		const audio = audioRef.current

		// Update the audio source and metadata when trackNo changes
		setSong(Playlist[trackNo].title)
		setArtist(Playlist[trackNo].artist)

		// Start playing the audio if isPlaying is true
		if (isPlaying) {
			audio
				.play()
				.then(() => {
					// Playback started successfully
				})
				.catch((error) => {
					// Handle play error if needed
					console.error("Error playing audio:", error)
				})
		} else {
			audio.pause()
		}
	}, [isPlaying, trackNo]) // Listen for changes to isPlaying and trackNo to handle playback

	const togglePlay = () => {
		setIsPlaying((prevIsPlaying) => !prevIsPlaying)
	}

	useEffect(() => {
		const audio = audioRef.current

		// Update progress while audio is playing
		const interval = setInterval(() => {
			if (isPlaying) {
				const currentTime = audio.currentTime
				const duration = audio.duration
				const progressPercentage = (currentTime / duration) * 100
				if (isNaN(progressPercentage)) {
					// If progress is NaN, force refresh cache and reload audio
					audio.load()
				} else {
					setProgress(progressPercentage)
				}
			}
		}, 1000)

		// Clear the interval on unmount or when isPlaying changes to false
		return () => {
			clearInterval(interval)
		}
	}, [isPlaying]) // Listen for changes to isPlaying to update progress

	return (
		<div className="fixed items-center flex m-0 align-bottom select-none left-8 bottom-[2rem] h-12 hover:w-[230px] delay-700 group transition-all duration-700 ease-in-out">
			<p className="absolute text-base left-10 bottom-36 whitespace-nowrap">Progress: {progress}</p>
			<div className="absolute flex items-center justify-center w-0 h-full pt-1 overflow-hidden text-left align-middle transition-all duration-300 ease-in-out rounded-l-none bg-black/60 group-hover:w-3/4 left-10 rounded-3xl">
				<div className="flex-col mb-2 ml-6">
					<h1 className="text-sm transition-all duration-150 ease-in delay-150 opacity-0 overflow-ellipsis group-hover:opacity-100 whitespace-nowrap">
						{song}
					</h1>
					<p className="text-xs font-bold transition-all duration-150 ease-in delay-150 opacity-0 text-slate-500 overflow-ellipsis group-hover:opacity-100 whitespace-nowrap">
						{artist}
					</p>
					<audio key={trackNo} ref={audioRef} src={Playlist[trackNo].source} />
					<div className="absolute bottom-0 left-0 z-10 w-full h-1 bg-gray-500">
						<div className="h-full bg-sky-500" style={{ width: `${progress}%` }}></div>
					</div>
				</div>
				<div className="ml-auto mb-1 mr-[7px] p-0 overflow-hidden transition-all duration-150 ease-in delay-150 rounded-full opacity-0 w-9 h-9 album-art group-hover:opacity-100">
					<img src={Playlist[trackNo].cover} alt="Album cover" className="aspect-square " />
				</div>
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

export default MusicPlayer
