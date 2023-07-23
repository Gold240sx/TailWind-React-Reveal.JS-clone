import { useState } from 'react'
import Slides from './components/Slides'
import ProgressBar from './components/progressBar'
import Controller from './components/Controller'

const Deck = [
    {name: 'test1', id: 1},
    {name: 'test2', id: 2},
    {name: 'test3', id: 3}
]

function App() {
  const [slide, setSlide] = useState(1)
  const [totalSlides, setTotalSlides] = useState(Deck.length)

  const slideshowOptions = {
		pageCounter: true,
		progressBar: true,
		controller: true,
        uiColor: '#42AEF8',
        //  disabled slides cause controls: Either  50% opacity (50Percent) and gray or 0% opacity(hidden),
        disabled: "hidden"
  }

    const { pageCounter, progressBar, controller, uiColor, disabled } = slideshowOptions

    // console.log(pageCounter)
  return (
		<>
			<div className="grid text-center h-screen items-center">
				<div className="slide-container p-[2rem] mb-1">
					<h1 className="align-middle mb-1"></h1>
				</div>
				{controller && (
					<Controller
						slide={slide}
						setSlide={setSlide}
						totalSlides={totalSlides}
						uiColor={uiColor}
                        disabled={disabled}
						className="right-6 bottom-14 w-fit h-fit fixed "
					/>
				)}
				{progressBar && <ProgressBar Slide={slide} setSlide={setSlide} totalSlides={totalSlides} uiColor={uiColor} />}
			</div>
		</>
  )
}

export default App
