// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
import '../styles/fab.css'
import { icons } from './icons.js'
import { store, subscribe, emitChange } from '../utils/store.js'

// The FAB is a single shared element whose icon and action change by context
// (story 007). Position, size, colour, and shadow stay identical everywhere.
// `rerenderScreen` re-renders the current route in place — used when an action
// changes app state without changing the route (e.g. switching Library tabs).
function getContext(rerenderScreen) {
  const hash = location.hash || '#/'

  // Home: create / start building a routine.
  if (hash === '#/') {
    return {
      icon: icons.plus,
      label: 'Build a routine',
      action: () => {
        store.buildingRoutine = true
        store.libraryTab = 'routines'
        location.hash = '#/library'
      },
    }
  }

  // Saved-routines list (story 010): start building a new routine in place.
  if (hash.startsWith('#/library') && !store.buildingRoutine && store.libraryTab === 'routines') {
    return {
      icon: icons.plus,
      label: 'Build a routine',
      action: () => {
        store.buildingRoutine = true
        store.libraryTab = 'routines'
        emitChange()
        rerenderScreen()
      },
    }
  }

  // Adding exercises to a draft (story 006): confirm and return to the build view.
  if (hash.startsWith('#/library') && store.buildingRoutine && store.libraryTab === 'exercises') {
    return {
      icon: icons.check,
      label: 'Done adding exercises',
      action: () => {
        store.libraryTab = 'routines'
        emitChange()
        rerenderScreen()
      },
    }
  }

  // No primary action defined for this screen — FAB is hidden.
  return null
}

export function renderFab(container, { rerenderScreen }) {
  function update() {
    const ctx = getContext(rerenderScreen)
    if (!ctx) {
      container.innerHTML = ''
      return
    }
    container.innerHTML = `
      <button class="app-fab" data-testid="fab" type="button" aria-label="${ctx.label}">
        <span class="app-fab__icon" data-testid="fab-icon">${ctx.icon}</span>
      </button>
    `
    container.querySelector('[data-testid="fab"]').addEventListener('click', ctx.action)
  }

  window.addEventListener('hashchange', update)
  subscribe(update)
  update()
}
