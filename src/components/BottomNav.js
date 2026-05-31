import '../styles/bottom-nav.css'
import { icons } from './icons.js'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: icons.home,     hash: '#/' },
  { id: 'library',  label: 'Library',  icon: icons.library,  hash: '#/library' },
  { id: 'history',  label: 'History',  icon: icons.history,  hash: '#/history' },
  { id: 'settings', label: 'Settings', icon: icons.settings, hash: '#/settings' },
]

// Derive the active tab from NAV_ITEMS so the mapping has a single source of
// truth. Home ('#/') matches only exactly; every other tab matches its prefix.
// A hash with no matching nav item (e.g. '#/create-routine') highlights none.
function getActiveId(hash) {
  const normalized = hash || '#/'
  const match = NAV_ITEMS.find(({ hash }) =>
    hash === '#/' ? normalized === '#/' : normalized.startsWith(hash)
  )
  return match ? match.id : null
}

export function renderBottomNav(container) {
  container.innerHTML = `
    <nav class="bottom-nav" data-testid="bottom-nav" aria-label="Main navigation">
      ${NAV_ITEMS.map(({ id, label, icon, hash }) => `
        <button
          class="bottom-nav__item"
          data-testid="nav-${id}"
          data-id="${id}"
          data-hash="${hash}"
          aria-label="${label}"
        >
          ${icon}
          <span class="bottom-nav__label">${label}</span>
        </button>
      `).join('')}
    </nav>
  `

  const buttons = container.querySelectorAll('[data-hash]')

  function updateActive() {
    const activeId = getActiveId(location.hash)
    buttons.forEach(btn => {
      const active = btn.dataset.id === activeId
      btn.classList.toggle('bottom-nav__item--active', active)
      if (active) btn.setAttribute('aria-current', 'page')
      else btn.removeAttribute('aria-current')
    })
  }

  // One delegated click listener instead of one per button, so navigation
  // does not re-attach listeners on every hash change.
  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-hash]')
    if (btn) location.hash = btn.dataset.hash
  })

  window.addEventListener('hashchange', updateActive)
  updateActive()
}
