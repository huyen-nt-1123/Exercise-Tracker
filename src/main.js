// Exercise Tracker — entry point
// Dev Agent: build features in src/components/, register routes here

import './styles/main.css'

const app = document.getElementById('app')

app.innerHTML = `
  <header data-testid="app-header">
    <h1>Exercise Tracker</h1>
  </header>
  <main data-testid="app-main">
    <p>App initializing…</p>
  </main>
  <nav data-testid="app-nav">
    <!-- Bottom nav goes here -->
  </nav>
`

// Register service worker (handled by vite-plugin-pwa in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js')
}
