import linkedinArtwork from '../../assets/images/photos/contact/linkedin.webp'
import githubArtwork from '../../assets/images/photos/contact/github.webp'
import behanceArtwork from '../../assets/images/photos/contact/behance.webp'
import spiderWebs from '../../assets/images/SVG/section 3/spider webs.svg'
import './Contact.css'

const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'Shefa-atef on LinkedIn',
    handle: 'Shefa-atef',
    href: 'https://www.linkedin.com/in/shefa-atef/',
    artwork: linkedinArtwork,
  },
  {
    id: 'behance',
    label: 'shefaalhindi on Behance',
    handle: 'shefaalhindi',
    href: 'https://www.behance.net/shefaalhindi',
    artwork: behanceArtwork,
  },
  {
    id: 'github',
    label: 'Shefaa-atef on GitHub',
    handle: 'Shefaa-atef',
    href: 'https://github.com/Shefaa-atef',
    artwork: githubArtwork,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <img className="contact__webs" src={spiderWebs} alt="" aria-hidden="true" draggable="false" />

      <div className="contact__scale-frame">
        <div className="contact__stage">
          <h2 id="contact-heading" className="contact__title">follow me</h2>

          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              className={`contact__social contact__social--${social.id}`}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              <img src={social.artwork} alt="" draggable="false" />
              <span>{social.handle}</span>
            </a>
          ))}

          <div className="contact__details" aria-label="Direct contact details">
            <a className="contact__detail" href="mailto:shefaalhendi@gmail.com">
              <span className="contact__detail-label">email me</span>
              <span className="contact__detail-value">shefaalhendi@gmail.com</span>
            </a>
            <a className="contact__detail" href="tel:+962787980339">
              <span className="contact__detail-label">call me</span>
              <span className="contact__detail-value">+962 787980339</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
