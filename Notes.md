I want to create a way to tell the app that if the current slide includes any video, that the music player is hidden.

Consider rewiting the formatting for the slides to more similarly be like a carousel: ie: side by side, and simply moving the viewport. Doing so should make it easier to implement the vertical scrolling.

Fix the initial animation of the slides. It should slide in, not fade in. 

Add a requiredAction property. const [requiredAction, setRequiredAction] = useState(true) to disable the controls until the user has done something. 

chrome button outline is  aweful as well