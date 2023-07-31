# React Tailwind Reveal.JS Clone
Repo: https://github.com/Gold240sx/Avi-Fishing-Book
Developer: Michael Martell

## Index
1. What is this app and why does it exist?
2. Getting started
3. Understanding the project
4. Cutomization Options
5. Feature Requests, Notes and Bugs

## What is this app and why does it exist?
Ever wanted to work on an app with the familiarity and expandability of a React app, while enabling Tailwind for a better developer experience without having to sacrifice on the quality user experiece you find with Reveal.JS? 

I developed this app from the ground up to give developer's all the freedom with a react app with a convienient starting place to start from scratch or add to their existing apps fast! The code is completely transparent aside from quite several quite popular npm packages, making understanding the app simple, and intuitive while, making updates and expandability easy. Dependancies are newer, so you can stop fussing over legacy--peer'd dependancies and security updates - atleast for a while.

## Getting Started?
1. Fork/Download the Repo
2. Just like any React App, Install via npm
```
    npm i 
```
3. Get the local server up and running.
```
    npm run dev
```

## Understanding the Project
Compared to Reveal.JS, this app is quite far behind in feature-set. For now, atleast, this app is moreso-dedicated to a quality dev-experience without sacrificing on the end-product than it is about giving you a more ridged templating setup with more features. Think Tailwind vs Bootstrap. This means more freedom, possibly more developer time, but less fighting things that have been built, and endless expansion. Adding additional dependncies is therefore a piece of cake and 

Configuration Options are presented at the very top of the components. I'll describe more aobut each option and what it does below.

### Slides and Vertical Slides

#### Types of Slides
A map of horizontal and vertical slides is automatically created on page load (save-refresh). Leaving the responsibility to you the content, transitions and the styling of your presentation. 
- <Slide> Horizontally transitioning Slides.
- <VerticalSlide> Vertical Slides. A Vertical Slide ***MUST CONTAIN*** atleast one <Slide> within it. Think of a VerticalSlide more like a ```"<></>"``` than anything else. It controls the behavior of the app.

#### Adding a new slide:
1. Create a new file in the "src/slides" folder. (Copy and paste an existing if you want).
2. Add the slide to the presentation by importing the file and adding the fiole name to the Slides array (in the order that you want it in.) located in the "Slides.jsx" file.

```dotnetcli
...
// src/components/Slides.jsx
import Slide1 from "../slides/Slide1.jsx"
import newlyAddedSlide from "../slides/newlyAddedSlide.jsx"

const Slides = () => {
	return [Slide1, newlyAddedSlide]
}
...
```
### Understanding Music
Music is loaded via the MusicPlayer located in "src/components/MusicPlayer.jsx". The music player is quite basic and plays a list of songs in order, on repeat with pause and play functionality, but if needed, it's not all that difficult to add additional functionality to the player or replace it with a more complex player. I've also included album art into the player. Assets for the MusicPlayer component is located in src/assets/Music.

  #### Adding Music:
Assets are imported to the music player file and each song's file info such as Artist, Song name, src file and album art should be imported into the "Playlist" obectArray.
```dotnetcli
import AddedSong from "../assets/Music/AddedSong.mp3"
import AddedSongCover from "../assets/Music/covers/AddedSongCover.png"
...
const Playlist = [
	...,
	{
		id: 2,
		title: "Added Song",
		artist: "Banksey",
		source: addedSong,
		cover: addedSongCover,
	},
]
```
1. Add the new song and details to the playlist array as pictured above.

## Customization Options
As stated above, customization options are located at the very top of the app file. I kept the options as objects so that refactoring this to a Typescript project would be simple.

### transition
- ##  duration: 0.5 -Conrols the duration of transitions between slides
- ## ease: "easeInOut" - Standard Transition 

### Slideshow Options
- #### pageCounter: true - (boolean) Shows or hides the page counter in the lower right edge of the screen
- #### progressBar: true - (boolean) Shows or hides the progress bar at the bottom of the screen
- #### controller: true - (boolean) shows or hides the controller ( up, down right...). (setting to false requires keyboard controls): (not yet functional)
- #### uiColor: "#42AEF8" - (hexcode) UI color: (not yet functional)
		//  disabled slides cause controls: Either  50% opacity (50Percent) and gray or 0% opacity(hidden),
- #### disabled: "hidden" - ("50Percent" || "hidden")
- #### linearControls: false - (boolean) While a vertical slide is available, force the user to select down to continue, guiding the user linearly and preventing unwanted skipping of slides 
- #### verticalSlides: true - (boolean) disables Up and down buttons ( if true, up + down become available only via  keyboard controls)
- #### verticalScroll: false - (boolean) Allow verticalScroll on VerticalSlides? False means mouse scroll will be disabled and vertical scroll becomes dependant on the arrows.
- #### musicPlayer: true - (boolean) hides the music player. ( If false, music player will not be displayed or available)

## Cutting Weight
### Removing the music player
1. To remove the music player, delete the musicPlayer.jsx file in the "src/components" folder.
2. Delete the import and the component in "src/App.jsx".
    Component: "{musicPlayer && <MusicPlayer />}"
3. Remove the Music folder located in the Assets folder.


 ## Feature Requests, Notes and Bugs
Feature requests, Notes to myself and bug reporting is currently located in the Notes.md file in the src (root) folder. See there for more.


## Disclaimer
I consider myself a mid-level React Dev. Therefore, I'm confident seasoned devs will find faster and more concise ways of implemeting what is already built. I welcome open source community involvement so if you have suggestions, get in touch with me at 240designworks@gmail.com . I in no way seek to impersonate or discredit the incredible work that Reveal.Js has put into their product, and I recognise my version isn't for everyone. 

