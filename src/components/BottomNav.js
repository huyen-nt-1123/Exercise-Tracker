import '../styles/bottom-nav.css'
import { icons } from './icons.js'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: icons.home,     active: true },
  { id: 'library',  label: 'Library',  icon: icons.library },
  { id: 'history',  label: 'History',  icon: icons.history },
  { id: 'settings', label: 'Settings', icon: icons.settings },
]

export function renderBottomNav(container) {
  container.innerHTML = `
    <nav class="bottom-nav" data-testid="bottom-nav" aria-label="Main navigation">
      ${NAV_ITEMS.map(({ id, label, icon, active }) => `
        <button
          class="bottom-nav__item${active ? ' bottom-nav__item--active' : ''}"
          data-testid="nav-${id}"
          aria-label="${label}"
          ${active ? 'aria-current="page"' : ''}
        >
          ${icon}
          <span class="bottom-nav__label">${label}</span>
        </button>
      `).join('')}
    </nav>
  `
}
