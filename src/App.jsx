import { useState } from 'react'
import SpiderCursor from './animations/cursor/spider/SpiderCursor.jsx'
import LoadingScreen from './components/layout/LoadingScreen.jsx'
import Hero from './sections/Hero/Hero.jsx'
import SectionTwo from './sections/SectionTwo/SectionTwo.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <SpiderCursor />
      <main inert={isLoading}>
        <Hero isReady={!isLoading} />
        <SectionTwo />
      </main>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
    </>
  )
}

export default App
