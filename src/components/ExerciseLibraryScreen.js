import '../styles/exercise-library-screen.css'
import { getAllExercises, searchExercises, getAllRoutines } from '../utils/db.js'
import { store } from '../utils/store.js'
import { EXERCISES_SEED } from '../utils/exercises-seed.js'

function chipClass(category) {
  const map = { chest: 'chest', back: 'back', legs: 'legs', shoulders: 'shoulders', arms: 'arms' }
  return `exercise-muscle-chip exercise-muscle-chip--${map[category] ?? 'default'}`
}

function planBtnClass(category) {
  const map = { chest: 'chest', back: 'back', legs: 'legs', shoulders: 'shoulders', arms: 'arms' }
  return `exercise-plan-btn exercise-plan-btn--${map[category] ?? 'default'}`
}

function muscleChipLabel(muscleGroups) {
  return muscleGroups.slice(0, 2).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(' / ')
}

function computeRoutineFocus(exercises) {
  const muscles = []
  for (const { exerciseId } of exercises) {
    const ex = EXERCISES_SEED.find(e => e.id === exerciseId)
    if (ex) {
      for (const m of ex.muscleGroups) {
        const label = m.charAt(0).toUpperCase() + m.slice(1)
        if (!muscles.includes(label)) muscles.push(label)
      }
    }
  }
  return muscles.slice(0, 4).join(', ')
}

function renderExerciseCard(exercise, isAdded) {
  const added = isAdded
  return `
    <div
      class="exercise-card"
      data-testid="exercise-card"
      data-exercise-id="${exercise.id}"
    >
      <div class="exercise-card__header">
        <div class="exercise-card__info">
          <span class="exercise-card__name" data-testid="exercise-name">${exercise.name}</span>
          <div class="exercise-card__meta">
            <span class="${chipClass(exercise.category)}" data-testid="exercise-muscle-chip">
              ${muscleChipLabel(exercise.muscleGroups)}
            </span>
            ${exercise.lastPerformance ? `
              <span class="exercise-card__last-hint" data-testid="exercise-last-hint">
                Last: ${exercise.lastPerformance}
              </span>
            ` : ''}
          </div>
        </div>
        <button class="exercise-card__expand" aria-hidden="true" tabindex="-1">+</button>
      </div>
      <div class="exercise-card__footer">
        <div class="exercise-card__pills">
          <span class="exercise-pill" data-testid="exercise-sets-display">3 Sets</span>
          <span class="exercise-pill" data-testid="exercise-reps-display">10 Reps</span>
        </div>
        <button
          class="${planBtnClass(exercise.category)}${added ? ' exercise-plan-btn--added' : ''}"
          data-testid="exercise-plan-btn"
          data-exercise-id="${exercise.id}"
          ${added ? 'disabled aria-label="Added"' : `aria-label="Plan ${exercise.name}"`}
        >
          ${added ? '✓ Added' : 'PLAN'}
        </button>
      </div>
    </div>
  `
}

function renderRoutineCard(routine) {
  const totalSets = routine.exercises.reduce((sum, e) => sum + e.sets, 0)
  const focus = computeRoutineFocus(routine.exercises)

  return `
    <div
      class="routine-card"
      data-testid="routine-card"
      data-routine-id="${routine.id}"
    >
      <div class="routine-card__top">
        <div class="routine-card__info">
          <span class="routine-card__name" data-testid="routine-card-name">${routine.name}</span>
          <span class="routine-card__focus" data-testid="routine-card-focus">Focus: ${focus}</span>
        </div>
      </div>
      <div class="routine-card__bottom">
        <div class="routine-card__stats">
          <div class="routine-stat-badge">
            <span class="routine-stat-badge__number" data-testid="routine-card-exercise-count">${routine.exercises.length}</span>
            <span class="routine-stat-badge__label">Exercises</span>
          </div>
          <div class="routine-stat-badge">
            <span class="routine-stat-badge__number" data-testid="routine-card-set-count">${totalSets}</span>
            <span class="routine-stat-badge__label">Total Sets</span>
          </div>
        </div>
        <button
          class="routine-card__start-btn"
          data-testid="routine-card-start-btn"
          data-routine-id="${routine.id}"
          aria-label="Start ${routine.name}"
        >
          ▶ Start
        </button>
      </div>
    </div>
  `
}

async function renderExercisesTab(content, exercises) {
  const addedIds = new Set(store.draftRoutine.exercises.map(e => e.exerciseId))

  content.innerHTML = `
    <div class="library-search-row">
      <input
        class="library-search-input"
        data-testid="exercise-search-input"
        type="search"
        placeholder="Search exercises..."
        autocomplete="off"
        value=""
      />
      <button class="library-filter-btn" data-testid="exercise-filter-btn" aria-label="Filter exercises">⚙</button>
    </div>
    <div class="library-section-header">
      <span class="library-section-title">Exercise Library</span>
      <span class="library-results-count" data-testid="exercise-results-count">${exercises.length} Results</span>
    </div>
    <div id="exercise-list">
      ${exercises.map(e => renderExerciseCard(e, addedIds.has(e.id))).join('')}
    </div>
    <div class="library-empty-state" data-testid="exercise-library-empty-state" style="display: none">
      No exercises found
    </div>
  `

  const searchInput = content.querySelector('[data-testid="exercise-search-input"]')
  const list = content.querySelector('#exercise-list')
  const countEl = content.querySelector('[data-testid="exercise-results-count"]')
  const emptyEl = content.querySelector('[data-testid="exercise-library-empty-state"]')

  searchInput.addEventListener('input', async () => {
    const results = await searchExercises(searchInput.value)
    const updated = new Set(store.draftRoutine.exercises.map(e => e.exerciseId))
    countEl.textContent = `${results.length} Results`
    if (results.length === 0) {
      list.innerHTML = ''
      emptyEl.style.display = 'flex'
    } else {
      list.innerHTML = results.map(e => renderExerciseCard(e, updated.has(e.id))).join('')
      emptyEl.style.display = 'none'
      attachPlanBtns(content)
    }
  })

  attachPlanBtns(content)

  // Auto-focus search if navigated from Create Routine
  if (store.libraryTab === 'exercises') {
    requestAnimationFrame(() => searchInput.focus())
  }
}

function attachPlanBtns(content) {
  content.querySelectorAll('[data-testid="exercise-plan-btn"]:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const exerciseId = btn.dataset.exerciseId
      const alreadyAdded = store.draftRoutine.exercises.some(e => e.exerciseId === exerciseId)
      if (alreadyAdded) return

      store.draftRoutine.exercises.push({ exerciseId, sets: 3, reps: 10 })

      btn.textContent = '✓ Added'
      btn.disabled = true
      btn.classList.add('exercise-plan-btn--added')
    })
  })
}

async function renderRoutinesTab(content) {
  const routines = await getAllRoutines()

  content.innerHTML = `
    <span class="routines-section-title">My Saved Workouts</span>
    <div class="routines-list" data-testid="routines-list">
      ${routines.length > 0
        ? routines.map(r => renderRoutineCard(r)).join('')
        : `<p style="color: var(--color-on-surface-variant); text-align: center; padding: var(--space-4)">
             No routines yet. Build your first one!
           </p>`
      }
    </div>
  `

  content.querySelectorAll('[data-testid="routine-card-start-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = '#/'
    })
  })
}

export async function renderExerciseLibraryScreen(container) {
  const exercises = await getAllExercises()

  container.innerHTML = `
    <div class="exercise-library-screen" data-testid="exercise-library-screen">
      <div class="library-tabs" role="tablist">
        <button
          class="library-tab${store.libraryTab === 'routines' ? ' library-tab--active' : ''}"
          data-testid="routines-tab"
          data-tab="routines"
          role="tab"
          aria-selected="${store.libraryTab === 'routines'}"
        >ROUTINES</button>
        <button
          class="library-tab${store.libraryTab === 'exercises' ? ' library-tab--active' : ''}"
          data-testid="exercises-tab"
          data-tab="exercises"
          role="tab"
          aria-selected="${store.libraryTab === 'exercises'}"
        >EXERCISES</button>
      </div>
      <div class="library-content" id="library-content"></div>
    </div>
  `

  const content = container.querySelector('#library-content')

  async function switchTab(tab) {
    store.libraryTab = tab
    container.querySelectorAll('.library-tab').forEach(btn => {
      const active = btn.dataset.tab === tab
      btn.classList.toggle('library-tab--active', active)
      btn.setAttribute('aria-selected', active)
    })
    content.innerHTML = ''
    if (tab === 'exercises') {
      await renderExercisesTab(content, exercises)
    } else {
      await renderRoutinesTab(content)
    }
  }

  container.querySelectorAll('.library-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab))
  })

  await switchTab(store.libraryTab)
}
