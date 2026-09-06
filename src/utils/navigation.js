const homeSections = ['hero', 'skills', 'projects', 'contact']

export function getReturnSection() {
  const from = new URLSearchParams(window.location.search).get('from')
  return homeSections.includes(from) ? from : 'projects'
}

export function getReturnHref() {
  return `${import.meta.env.BASE_URL}#${getReturnSection()}`
}

export function pageHref(path, section) {
  let from = section
  if (!from) {
    const isHome = window.location.pathname.replace(/\/+$/, '') === import.meta.env.BASE_URL.replace(/\/+$/, '')
    if (isHome) {
      // Use the section at the viewport center even when its URL hash is stale.
      from = homeSections.find(id => {
        const bounds = document.getElementById(id)?.getBoundingClientRect()
        return bounds && bounds.top <= window.innerHeight / 2 && bounds.bottom > window.innerHeight / 2
      })
    } else {
      from = getReturnSection()
    }
  }
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}?from=${homeSections.includes(from) ? from : 'projects'}`
}
