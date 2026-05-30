import '../styles/home-screen.css'
import { getAllRoutines } from '../utils/db.js'

export async function renderHomeScreen(container) {
  const routines = await getAllRoutines()

  if (routines.length === 0) {
    renderEmptyState(container)
  } else {
    renderHasRoutines(container, routines)
  }
}

function renderEmptyState(container) {
  container.innerHTML = `
    <div class="home-screen">
      <section class="home-empty-state" data-testid="home-empty-state">
        <h1 class="home-empty__headline" data-testid="home-empty-headline">
          Your fitness journey starts here.
        </h1>
        <p class="home-empty__subtext" data-testid="home-empty-subtext">
          You haven't planned any workouts yet. Let's build your first routine.
        </p>

        <div class="home-bento-grid">
          <button class="home-bento-card" data-testid="quick-start-card" aria-label="Quick Start">
            <span class="home-bento-card__title">Quick Start</span>
            <span class="home-bento-card__subtitle">Log an empty workout session</span>
          </button>
          <button class="home-bento-card" data-testid="ai-generator-card" aria-label="AI Generator">
            <span class="home-bento-card__title">AI Generator</span>
            <span class="home-bento-card__subtitle">Suggest a routine based on goals</span>
          </button>
        </div>

        <div class="home-illustration" data-testid="home-illustration" aria-hidden="true">
          <div class="home-illustration__bubble"></div>
          <span class="home-illustration__text">GO TIME!</span>
        </div>

        <div class="home-cta">
          <button
            class="btn btn-primary"
            style="width: 100%"
            data-testid="build-first-workout-btn"
          >
            Build Your First Workout
          </button>
        </div>
      </section>
    </div>
  `

  container.querySelector('[data-testid="build-first-workout-btn"]').addEventListener('click', () => {
    location.hash = '#/create-routine'
  })

  container.querySelector('[data-testid="quick-start-card"]').addEventListener('click', () => {
    location.hash = '#/create-routine'
  })

  container.querySelector('[data-testid="ai-generator-card"]').addEventListener('click', () => {
    location.hash = '#/create-routine'
  })
}

function renderHasRoutines(container, routines) {
  container.innerHTML = `
    <div class="home-screen">
      <div class="home-has-routines">
        <h1 class="home-has-routines__heading">Welcome back!</h1>
        <p>You have ${routines.length} routine${routines.length === 1 ? '' : 's'} saved.</p>
        <button class="btn btn-primary" style="width: 100%" id="go-to-library-btn">
          View My Routines
        </button>
      </div>
    </div>
  `

  container.querySelector('#go-to-library-btn').addEventListener('click', () => {
    location.hash = '#/library'
  })
}
