import '../styles/bottom-nav.css'
import { icons } from './icons.js'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: icons.home,     hash: '#/' },
  { id: 'library',  label: 'Library',  icon: icons.library,  hash: '#/library' },
  { id: 'history',  label: 'History',  icon: icons.history,  hash: '#/history' },
  { id: 'settings', label: 'Settings', icon: icons.settings, hash: '#/settings' },
]

function getActiveId(hash) {
  if (hash.startsWith('#/library')) return 'library'
  if (hash.startsWith('#/history')) return 'history'
  if (hash.startsWith('#/settings')) return 'settings'
  return 'home'
}

export function renderBottomNav(container) {
  function render() {
    const activeId = getActiveId(location.hash || '#/')
    container.innerHTML = `
      <nav class="bottom-nav" data-testid="bottom-nav" aria-label="Main navigation">
        ${NAV_ITEMS.map(({ id, label, icon, hash }) => {
          const active = id === activeId
          return `
            <button
              class="bottom-nav__item${active ? ' bottom-nav__item--active' : ''}"
              data-testid="nav-${id}"
              data-hash="${hash}"
              aria-label="${label}"
              ${active ? 'aria-current="page"' : ''}
            >
              ${icon}
              <span class="bottom-nav__label">${label}</span>
            </button>
          `
        }).join('')}
      </nav>
    `

    container.querySelectorAll('[data-hash]').forEach(btn => {
      btn.addEventListener('click', () => {
        location.hash = btn.dataset.hash
      })
    })
  }

  render()
  window.addEventListener('hashchange', render)
}
