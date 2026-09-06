import { lazy, Suspense, useState, useEffect } from 'react'
import SpiderCursor from './animations/cursor/spider/SpiderCursor.jsx'
import InvertedSelection from './components/common/InvertedSelection.jsx'
import LoadingScreen from './components/layout/LoadingScreen.jsx'
import ComicMenu from './components/layout/ComicMenu.jsx'
import Hero from './sections/Hero/Hero.jsx'
import SectionTwo from './sections/SectionTwo/SectionTwo.jsx'
import SectionThree from './sections/SectionThree/SectionThree.jsx'
import Contact from './sections/Contact/Contact.jsx'

const AboutPage = lazy(() => import('./pages/About/AboutPage.tsx'))
const DesignsPage = lazy(() => import('./pages/Designs/DesignsPage.tsx'))
const ProjectsPage = lazy(() => import('./sections/Projects/Projects.jsx'))

function isAboutRoute() {
  return window.location.pathname.replace(/\/+$/, '') === '/about'
}

function isDesignsRoute() {
  return window.location.pathname.replace(/\/+$/, '') === '/designs'
}

function isProjectsRoute() {
  return window.location.pathname.replace(/\/+$/, '') === '/projects'
}

function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300)
      }
    }
  }, [isLoading])

  return (
    <>
      <SpiderCursor />
      <InvertedSelection />
      <main inert={isLoading}>
        <Hero isReady={!isLoading} />
        <SectionTwo />
        <SectionThree />
        <Contact />
      </main>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
    </>
  )
}

function AboutRoute() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Suspense fallback={null}>
        <div inert={isLoading}>
          <AboutPage />
        </div>
      </Suspense>

      {isLoading && (
        <LoadingScreen
          theme="dark"
          onComplete={() => setIsLoading(false)}
        />
      )}
    </>
  )
}

function DesignsRoute() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Suspense fallback={null}>
        <div inert={isLoading}>
          <DesignsPage />
        </div>
      </Suspense>

      {isLoading && (
        <LoadingScreen
          theme="dark"
          onComplete={() => setIsLoading(false)}
        />
      )}
    </>
  )
}

function ProjectsRoute() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Suspense fallback={null}>
        <div inert={isLoading}>
          <ProjectsPage />
        </div>
      </Suspense>

      {isLoading && (
        <LoadingScreen
          theme="dark"
          onComplete={() => setIsLoading(false)}
        />
      )}
    </>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOpenMenu = () => setIsMenuOpen(true)
  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <>
      <ComicMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <button
        className="comic-menu"
        type="button"
        aria-label="Open menu"
        onClick={handleOpenMenu}
      >
        <span>Menu</span>
      </button>
      {isAboutRoute() ? (
        <AboutRoute />
      ) : isDesignsRoute() ? (
        <DesignsRoute />
      ) : isProjectsRoute() ? (
        <ProjectsRoute />
      ) : (
        <HomePage />
      )}
    </>
  )
}

export default App
