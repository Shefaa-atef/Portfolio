import { useState } from 'react'
import SpiderCursor from './animations/cursor/spider/SpiderCursor.jsx'
import InvertedSelection from './components/common/InvertedSelection.jsx'
import LoadingScreen from './components/layout/LoadingScreen.jsx'
import Hero from './sections/Hero/Hero.jsx'
import SectionTwo from './sections/SectionTwo/SectionTwo.jsx'
import SectionThree from './sections/SectionThree/SectionThree.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <SpiderCursor />
      <InvertedSelection />
      <main inert={isLoading}>
        <Hero isReady={!isLoading} />
        <SectionTwo />
        <SectionThree />
      </main>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
    </>
  )
}

export default App
