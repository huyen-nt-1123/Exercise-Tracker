// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
import './styles/main.css'
import { renderAppHeader } from './components/AppHeader.js'
import { renderBottomNav } from './components/BottomNav.js'
import { renderFab } from './components/Fab.js'
import { store } from './utils/store.js'

const app = document.getElementById('app')

const header = document.createElement('div')
const main = document.createElement('main')
const nav = document.createElement('div')
const fab = document.createElement('div')

main.setAttribute('data-testid', 'app-main')

app.append(header, main, nav, fab)

renderAppHeader(header)
renderBottomNav(nav)

function renderPlaceholder(title) {
  return container => {
    container.innerHTML = `
      <section class="screen-message" data-testid="placeholder-screen">
        <p class="text-headline">${title}</p>
        <p>This screen is coming soon.</p>
      </section>
    `
  }
}

// Each route resolves to a render(container) function. Loading the module is
// kept separate from rendering so navigate() can drop superseded navigations
// before they write to the DOM.
const routes = {
  '#/': () => import('./components/HomeScreen.js').then(m => m.renderHomeScreen),
  '#/library': () => import('./components/ExerciseLibraryScreen.js').then(m => m.renderExerciseLibraryScreen),
  '#/history': () => renderPlaceholder('History'),
  '#/settings': () => renderPlaceholder('Settings'),
}

let navToken = 0

async function navigate(hash) {
  // Create Routine is no longer a standalone screen (story 006) — it is the
  // build view inside the Library ROUTINES tab. Redirect any old links there.
  if (hash === '#/create-routine') {
    store.buildingRoutine = true
    store.libraryTab = 'routines'
    location.hash = '#/library'
    return
  }

  const token = ++navToken
  const loadRoute = routes[hash] ?? routes['#/']
  try {
    const renderScreen = await loadRoute()
    if (token !== navToken) return // a newer navigation superseded this one
    main.innerHTML = ''
    await renderScreen(main)
  } catch (err) {
    if (token !== navToken) return
    console.error('Navigation failed:', err)
    main.innerHTML = `
      <section class="screen-message" data-testid="screen-error" role="alert">
        <p class="text-headline">Something went wrong</p>
        <p>This screen couldn't be loaded. Please try again.</p>
        <button class="btn btn-primary" data-testid="retry-button">Retry</button>
      </section>
    `
    main.querySelector('[data-testid="retry-button"]')
      .addEventListener('click', () => navigate(location.hash || '#/'))
  }
}

window.addEventListener('hashchange', () => navigate(location.hash))
navigate(location.hash || '#/')

// Shared FAB lives above all screens; it re-renders the current route in place
// when an action changes app state without changing the route (story 007).
renderFab(fab, { rerenderScreen: () => navigate(location.hash || '#/') })

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js')
}
