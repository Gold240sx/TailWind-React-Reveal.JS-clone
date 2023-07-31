# Bugs
1. Fix the initial animation of the slides. It should slide in, not fade in. 
2. In Safari, the music Player isn't working.



# Features
### Controls
1. Add up / down (tap per slide) hold for scroll.

### Map
1. Add a Map of the existing slides. Open Map on "M" keypress

### Music Player
1. I want to create a way to tell the app that if the current slide includes any video, that the music player is hidden and pauses the music smoothly and opens up video controls

### Shopping Cart
1. Add a minimizable shopping cart, with a list op products that can be added by the devs. Add a Store Setup backend for Clients to update their project and have a fully integrated store.

### Validation + Access Protocols
1. Add a requiredAction property. const [requiredAction, setRequiredAction] = useState(true) to disable the controls until the user has done something. 

### Styling
1. Add styling for things like code.



# Updates
## Beta Update (1.1 07/31/23 - MM)
1. Fixed Vertical Height change between slides and Vertical Slides
2. Added Vertical Scroll Option. 
3. Added Vertical Scroll Event listener so if scrolling via mouse instead of the controller, the slide tracker will update automatically.
4. Fixed an issue in Chrome where the controller wouldn't scroll to the last slide of a VerticalSlide
5. Added keyboard controls.