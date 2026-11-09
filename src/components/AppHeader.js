// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
import '../styles/app-header.css'
import { icons } from './icons.js'

export function renderAppHeader(container) {
  container.innerHTML = `
    <header class="app-header" data-testid="app-header">
      <div class="app-header__inner">
        <button class="app-header__avatar" data-testid="header-avatar" aria-label="View profile">
          <span aria-hidden="true">HN</span>
        </button>
        <span class="app-header__logo">FLEXLOG</span>
        <button class="icon-btn" data-testid="header-notifications" aria-label="Notifications">
          ${icons.bell}
        </button>
      </div>
    </header>
  `
}
