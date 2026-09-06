import { useEffect, useCallback } from 'react'
import spiderWebs from '../../assets/images/SVG/section 3/spider webs.svg'
import cvPdf from '../../assets/Shefa_Alhendi_CV_2026.pdf'
import './ComicMenu.css'

const MENU_ITEMS = [
  {
    num: '01',
    title: 'HOME',
    subtitle: 'Hero & Cover',
    target: 'hero',
    isExternalRoute: false,
    route: '/',
    accent: 'var(--comic-purple, #74128f)',
  },
  {
    num: '02',
    title: 'SKILLS',
    subtitle: 'Superpowers & Tech Stack',
    target: 'skills',
    isExternalRoute: false,
    route: '/',
    accent: 'var(--comic-blue, #189bd5)',
  },
  {
    num: '03',
    title: 'PROJECTS',
    subtitle: 'Featured Works & Showcase',
    target: null,
    isExternalRoute: true,
    route: '/projects/',
    accent: 'var(--comic-purple, #74128f)',
  },
  {
    num: '04',
    title: 'ABOUT',
    subtitle: 'Developer Journey & Experience',
    target: null,
    isExternalRoute: true,
    route: '/about/',
    accent: 'var(--comic-blue, #189bd5)',
  },
  {
    num: '05',
    title: 'CONTACT',
    subtitle: 'Social Links & Signals',
    target: 'contact',
    isExternalRoute: false,
    route: '/',
    accent: 'var(--comic-purple, #74128f)',
  },
]

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shefa-atef/' },
  { name: 'GitHub', href: 'https://github.com/Shefaa-atef' },
  { name: 'Behance', href: 'https://www.behance.net/shefaalhindi' },
]

export default function ComicMenu({ isOpen, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const handleNavClick = (item) => {
    onClose()
    if (item.isExternalRoute) {
      const route = `${import.meta.env.BASE_URL}${item.route.slice(1)}`
      if (window.location.pathname.replace(/\/+$/, '') === route.replace(/\/+$/, '')) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.location.assign(route)
      }
      return
    }

    if (window.location.pathname.replace(/\/+$/, '') !== import.meta.env.BASE_URL.replace(/\/+$/, '')) {
      window.location.assign(`${import.meta.env.BASE_URL}#${item.target}`)
      return
    }

    if (item.target === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(item.target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div
      className="comic-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Menu"
      onClick={onClose}
    >
      <div
        className="comic-menu-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={spiderWebs} alt="" className="comic-menu-web" aria-hidden="true" />

        {/* Header */}
        <div className="comic-menu-modal__header">
          <div className="comic-menu-modal__title-group">
            <span className="comic-menu-modal__kicker">SHEFA ATEF</span>
            <h2 className="comic-menu-modal__heading">INDEX</h2>
          </div>
          <button
            type="button"
            className="comic-menu-modal__close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <span>Close</span>
          </button>
        </div>

        {/* Menu Items Grid */}
        <nav className="comic-menu-modal__grid" aria-label="Main menu">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.num}
              type="button"
              className="comic-menu-item"
              onClick={() => handleNavClick(item)}
              style={{
                '--item-accent': item.accent,
                '--stagger-delay': `${index * 60}ms`,
              }}
            >
              <span className="comic-menu-item__num">{item.num}</span>
              <div className="comic-menu-item__text">
                <span className="comic-menu-item__title">{item.title}</span>
                <span className="comic-menu-item__subtitle">{item.subtitle}</span>
              </div>
              <span className="comic-menu-item__arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </nav>

        {/* Social Links Footer */}
        <div className="comic-menu-modal__footer">
          {SOCIAL_LINKS.map((soc) => (
            <a
              key={soc.name}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              className="comic-menu-footer-link"
            >
              {soc.name}
            </a>
          ))}
          <a
            href={cvPdf}
            download="Shefa_Alhendi_CV_2026.pdf"
            onClick={(e) => {
              e.preventDefault();
              fetch(cvPdf)
                .then((res) => res.blob())
                .then((blob) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;
                  a.download = "Shefa_Alhendi_CV_2026.pdf";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                })
                .catch(() => {
                  window.open(cvPdf, "_blank");
                });
            }}
            className="comic-menu-footer-link cursor-pointer"
            style={{ color: '#ffcc00', fontWeight: 'bold' }}
          >
            📄 RESUME (PDF)
          </a>
        </div>
      </div>
    </div>
  )
}
