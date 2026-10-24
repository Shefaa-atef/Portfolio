import { projectContributions } from '../../data/projects'
import { useState } from 'react'

export default function ProjectCard({ project, index }) {
  const contribution = projectContributions[project.id]
  const [showSecond, setShowSecond] = useState(false)
  const hasSecondImage = project.images.length > 1
  const moveLens = (event) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--lens-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--lens-y', `${event.clientY - bounds.top}px`)
    event.currentTarget.dataset.revealing = 'true'
  }
  return (
    <article className="project-panel" id={project.id} style={{ '--project-accent': project.color }} aria-labelledby={`${project.id}-title`}>
      <div className="project-panel__info">
        <div className="project-panel__meta"><span>{String(index + 1).padStart(2, '0')} / {project.type}</span><span>{project.year || 'UI / UX'}</span></div>
        <h2 id={`${project.id}-title`}>{project.name}</h2>
        <h3>{project.subtitle}</h3>
        <p>{project.description}</p>
        {contribution && <dl className="project-contribution"><div><dt>My role</dt><dd>{contribution.role}</dd></div><div><dt>What I built</dt><dd>{contribution.built}</dd></div></dl>}
        <ul className="project-panel__tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-panel__links">{project.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div>
      </div>
      <div className="project-panel__visual">
        <div className={`project-reveal${showSecond ? ' is-second' : ''}`} onPointerMove={moveLens} onPointerLeave={event => { event.currentTarget.dataset.revealing = 'false' }}>
          <img src={project.images[0]} alt={showSecond ? (project.imageAlts?.[1] ?? `${project.name} second project view`) : (project.imageAlts?.[0] ?? `${project.name} comic-style project artwork`)} loading={index ? 'lazy' : 'eager'} draggable="false" width="1672" height="941" />
          {hasSecondImage && <img className="project-reveal__second" src={project.images[1]} alt="" aria-hidden="true" loading={index ? 'lazy' : 'eager'} draggable="false" width="1672" height="941" />}
        </div>
        {hasSecondImage && <button className="project-view-toggle" type="button" aria-pressed={showSecond} onClick={() => setShowSecond(value => !value)} aria-label={`${showSecond ? 'Show first' : 'Show second'} view of ${project.name}`}>{showSecond ? 'Back to first view' : 'Show second view'} ↗</button>}
      </div>
    </article>
  )
}
