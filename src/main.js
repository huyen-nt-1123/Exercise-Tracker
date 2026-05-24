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

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js')
}
