import purpleBackground from '../../assets/images/photos/section 1/purple background.png'
import spiderWoman from '../../assets/images/photos/section 1/spider woman.png'
import paperBackground from '../../assets/images/photos/section 1/paper background.png'
import spiderWebOne from '../../assets/images/SVG/section 1/spider web 1.svg'
import spiderWebTwo from '../../assets/images/SVG/section 1/spider web 2.svg'
import spiderWebThree from '../../assets/images/SVG/section 1/spider web 3.svg'
import dots from '../../assets/images/SVG/section 1/dots.svg'
import tape from '../../assets/images/SVG/section 1/tape.svg'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <img
        className="hero-section__purple-background"
        src={purpleBackground}
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-section__character"
        src={spiderWoman}
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-section__paper"
        src={paperBackground}
        alt=""
        aria-hidden="true"
      />

      <img className="hero-web hero-web--one" src={spiderWebOne} alt="" />
      <img className="hero-web hero-web--two" src={spiderWebTwo} alt="" />
      <img className="hero-web hero-web--three" src={spiderWebThree} alt="" />
      <img className="hero-dots" src={dots} alt="" aria-hidden="true" />

      <header className="hero-header">
        <button className="menu-button" type="button" aria-label="Open menu">
          <span>Menu</span>
        </button>
      </header>

      <div className="hero-label hero-kicker">
        <p><span>Portfolio</span></p>
      </div>
      <div className="hero-label hero-name">
        <p><span>Shefa Atef</span></p>
      </div>

      <div className="hero-year" aria-label="2026">
        <img src={tape} alt="" aria-hidden="true" />
        <span>20</span>
        <span>26</span>
      </div>

      <h1 id="hero-title" className="hero-title">
        <span>Creative</span>{' '}
        <span>Developer</span>
      </h1>

      <div className="hero-ribbon" aria-hidden="true">
        <div className="hero-ribbon__viewport">
          <div className="hero-ribbon__track">
            <p>With great skills come great projects</p>
            <p>With great skills come great projects</p>
            <p>With great skills come great projects</p>
            <p>With great skills come great projects</p>
          </div>
        </div>
        <img className="hero-tape hero-tape--left" src={tape} alt="" />
        <img className="hero-tape hero-tape--right" src={tape} alt="" />
      </div>
    </section>
  )
}
