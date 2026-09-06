import { useState } from 'react'
import { pageHref } from '../../utils/navigation'
import aboutPage from '../../assets/images/photos/section 3/about me@3x.webp'
import projectsPage from '../../assets/images/photos/section 3/my projects@3x.webp'
import designsPage from '../../assets/images/photos/section 3/designs@3x.webp'
import dotDesign from '../../assets/images/SVG/section 3/dot design.svg'
import spiderWebs from '../../assets/images/SVG/section 3/spider webs.svg'
import spiderLogo from '../../assets/icons/spider.svg'
import './SectionThree.css'

const PORTFOLIO_PAGES = [
  {
    id: 'about',
    label: 'Open the About Me portfolio page',
    image: aboutPage,
    className: 'section-three__page--about',
    destination: '/about/',
  },
  {
    id: 'projects',
    label: 'Open the Projects portfolio page',
    image: projectsPage,
    className: 'section-three__page--projects',
    destination: '/projects/',
  },
  {
    id: 'designs',
    label: 'Open the Designs portfolio page',
    image: designsPage,
    className: 'section-three__page--designs',
    destination: '/designs/',
  },
]

function PortfolioPage({ page, isSelected, onSelect }) {
  const handleClick = () => {
    onSelect((prev) => (prev === page.id ? null : page.id))
    if (page.destination) window.location.assign(pageHref(page.destination, 'projects'))
  }

  return (
    <button
      className={`section-three__page ${page.className}${isSelected ? ' is-selected' : ''}`}
      type="button"
      aria-label={page.label}
      aria-pressed={isSelected}
      onClick={handleClick}
    >
      <img src={page.image} alt="" draggable="false" decoding="async" loading="lazy" />
    </button>
  )
}

export default function SectionThree() {
  const [selectedPage, setSelectedPage] = useState(null)

  return (
    <section id="projects" className="section-three" aria-labelledby="portfolio-pages-heading">
      <h2 id="portfolio-pages-heading" className="visually-hidden">Explore the portfolio</h2>

      <div className="section-three__under-layer">
        <div className="section-three__under-stage">
          <img className="section-three__dots" src={dotDesign} alt="" aria-hidden="true" draggable="false" />
        </div>
        <img className="section-three__webs" src={spiderWebs} alt="" aria-hidden="true" draggable="false" />
      </div>

      <div className="section-three__scale-frame">
        <div className="section-three__stage">
          <div className={`section-three__pages${selectedPage ? ' section-three__pages--has-selection' : ''}`}>
            {PORTFOLIO_PAGES.map((page) => (
              <PortfolioPage
                key={page.id}
                page={page}
                isSelected={selectedPage === page.id}
                onSelect={setSelectedPage}
              />
            ))}
          </div>

          <div className="section-three__cta" aria-hidden="true">
            <span className="section-three__cta-inner">
              <img src={spiderLogo} alt="" draggable="false" />
              <span>Click any page to see more</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
