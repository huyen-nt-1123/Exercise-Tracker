import './styles/main.css'
import { renderAppHeader } from './components/AppHeader.js'
import { renderBottomNav } from './components/BottomNav.js'

const app = document.getElementById('app')

const header = document.createElement('div')
const main = document.createElement('main')
const nav = document.createElement('div')

main.setAttribute('data-testid', 'app-main')

app.append(header, main, nav)

renderAppHeader(header)
renderBottomNav(nav)

const routes = {
  '#/': () => import('./components/HomeScreen.js').then(m => m.renderHomeScreen(main)),
  '#/create-routine': () => import('./components/CreateRoutineScreen.js').then(m => m.renderCreateRoutineScreen(main)),
  '#/library': () => import('./components/ExerciseLibraryScreen.js').then(m => m.renderExerciseLibraryScreen(main)),
}

async function navigate(hash) {
  const route = routes[hash] ?? routes['#/']
  main.innerHTML = ''
  await route()
}

window.addEventListener('hashchange', () => navigate(location.hash))
navigate(location.hash || '#/')

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js')
}
