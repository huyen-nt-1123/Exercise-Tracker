import '../styles/create-routine-screen.css'
import { store } from '../utils/store.js'
import { saveRoutine } from '../utils/db.js'
import { EXERCISES_SEED } from '../utils/exercises-seed.js'

function getExerciseById(id) {
  return EXERCISES_SEED.find(e => e.id === id)
}

function formatMuscleLabel(muscleGroups) {
  return muscleGroups.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(' & ')
}

function renderExerciseTargetCard(item, index) {
  const exercise = getExerciseById(item.exerciseId)
  const name = exercise ? exercise.name : item.exerciseId
  const muscleLabel = exercise ? formatMuscleLabel(exercise.muscleGroups) : ''

  return `
    <div
      class="exercise-target-card"
      data-testid="exercise-target-card"
      data-exercise-id="${item.exerciseId}"
    >
      <div class="exercise-target-card__header">
        <div class="exercise-target-card__info">
          <span class="exercise-target-card__name" data-testid="exercise-target-name">${name}</span>
          <span class="exercise-target-card__muscle">${muscleLabel}</span>
        </div>
        <button
          class="exercise-target-card__remove"
          data-testid="remove-exercise-btn"
          data-index="${index}"
          aria-label="Remove ${name}"
        >×</button>
      </div>
      <div class="exercise-target-card__steppers">
        <div class="stepper">
          <span class="stepper__label">Sets</span>
          <div class="stepper__control">
            <button class="stepper__btn" data-testid="sets-decrement-btn" data-field="sets" data-index="${index}" aria-label="Decrease sets">−</button>
            <input
              class="stepper__value"
              data-testid="sets-value"
              data-field="sets"
              data-index="${index}"
              type="number"
              min="1"
              value="${item.sets}"
              inputmode="numeric"
              aria-label="Sets"
            />
            <button class="stepper__btn" data-testid="sets-increment-btn" data-field="sets" data-index="${index}" aria-label="Increase sets">+</button>
          </div>
        </div>
        <div class="stepper">
          <span class="stepper__label">Reps</span>
          <div class="stepper__control">
            <button class="stepper__btn" data-testid="reps-decrement-btn" data-field="reps" data-index="${index}" aria-label="Decrease reps">−</button>
            <input
              class="stepper__value"
              data-testid="reps-value"
              data-field="reps"
              data-index="${index}"
              type="number"
              min="1"
              value="${item.reps}"
              inputmode="numeric"
              aria-label="Reps"
            />
            <button class="stepper__btn" data-testid="reps-increment-btn" data-field="reps" data-index="${index}" aria-label="Increase reps">+</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderScreen(container) {
  const draft = store.draftRoutine
  const hasExercises = draft.exercises.length > 0

  container.innerHTML = `
    <div class="create-routine-screen" data-testid="create-routine-screen">
      <div class="create-routine__header">
        <span class="create-routine__label">New Program</span>
        <h1 class="create-routine__title">Create Routine</h1>
      </div>

      <div class="routine-name-card">
        <label class="routine-name-card__label" data-testid="routine-name-label" for="routine-name-input">
          Routine Name
        </label>
        <input
          id="routine-name-input"
          class="routine-name-card__input"
          data-testid="routine-name-input"
          type="text"
          placeholder="e.g., Push Day"
          value="${draft.name}"
          autocomplete="off"
        />
        <span
          class="routine-name-card__error${draft.showNameError ? ' routine-name-card__error--visible' : ''}"
          data-testid="routine-name-error"
          role="alert"
        >
          Please give your routine a name
        </span>
      </div>

      ${hasExercises ? `
        <section class="plan-targets-section" data-testid="plan-targets-section">
          <div class="plan-targets__header">
            <h2 class="plan-targets__heading" data-testid="plan-targets-heading">Plan Targets</h2>
            <p class="plan-targets__subtext">Set your goals for today's session.</p>
          </div>
          ${draft.exercises.map((item, i) => renderExerciseTargetCard(item, i)).join('')}
        </section>
      ` : `
        <div class="exercise-empty-state" data-testid="exercise-list-empty-state">
          <span class="exercise-empty-state__primary">No exercises added yet</span>
          <span class="exercise-empty-state__secondary">Tap below to build your set list</span>
        </div>
      `}

      <button class="add-exercises-btn" data-testid="add-exercises-btn">
        + Add Exercises
      </button>

      <div class="save-routine-area">
        <button
          class="btn btn-primary"
          style="width: 100%"
          data-testid="save-routine-btn"
          ${hasExercises ? '' : 'disabled style="width: 100%; opacity: 0.5; cursor: not-allowed"'}
        >
          Save Routine
        </button>
      </div>
    </div>
  `

  attachListeners(container)
}

function attachListeners(container) {
  const draft = store.draftRoutine

  // Sync name input to store
  const nameInput = container.querySelector('[data-testid="routine-name-input"]')
  nameInput.addEventListener('input', () => {
    draft.name = nameInput.value
    draft.showNameError = false
    nameInput.classList.remove('routine-name-card__input--error')
    container.querySelector('[data-testid="routine-name-error"]').classList.remove('routine-name-card__error--visible')
  })

  // Navigate to library
  container.querySelector('[data-testid="add-exercises-btn"]').addEventListener('click', () => {
    draft.name = nameInput.value
    store.libraryTab = 'exercises'
    location.hash = '#/library'
  })

  // Stepper buttons
  container.querySelectorAll('[data-testid="sets-decrement-btn"], [data-testid="reps-decrement-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const { field, index } = btn.dataset
      const item = draft.exercises[+index]
      if (item[field] > 1) {
        item[field]--
        container.querySelector(`[data-index="${index}"][data-testid="${field}-value"]`).value = item[field]
      }
    })
  })

  container.querySelectorAll('[data-testid="sets-increment-btn"], [data-testid="reps-increment-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const { field, index } = btn.dataset
      const item = draft.exercises[+index]
      item[field]++
      container.querySelector(`[data-index="${index}"][data-testid="${field}-value"]`).value = item[field]
    })
  })

  // Direct value input
  container.querySelectorAll('[data-testid="sets-value"], [data-testid="reps-value"]').forEach(input => {
    input.addEventListener('change', () => {
      const { field, index } = input.dataset
      const raw = parseInt(input.value, 10)
      const item = draft.exercises[+index]
      if (!isNaN(raw) && raw >= 1) {
        item[field] = raw
        input.value = raw
      } else {
        input.value = item[field]
      }
    })
  })

  // Remove exercise
  container.querySelectorAll('[data-testid="remove-exercise-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = +btn.dataset.index
      draft.exercises.splice(i, 1)
      renderScreen(container)
    })
  })

  // Save
  container.querySelector('[data-testid="save-routine-btn"]').addEventListener('click', async () => {
    draft.name = nameInput.value.trim()
    if (!draft.name) {
      draft.showNameError = true
      nameInput.classList.add('routine-name-card__input--error')
      container.querySelector('[data-testid="routine-name-error"]').classList.add('routine-name-card__error--visible')
      nameInput.focus()
      return
    }
    if (draft.exercises.length === 0) return

    await saveRoutine({
      id: crypto.randomUUID(),
      name: draft.name,
      exercises: draft.exercises.map(e => ({ exerciseId: e.exerciseId, sets: e.sets, reps: e.reps, weight: null })),
      createdAt: new Date().toISOString(),
    })

    store.draftRoutine = { name: '', exercises: [] }

    showToast('Routine saved!')

    setTimeout(() => {
      store.libraryTab = 'routines'
      location.hash = '#/library'
    }, 1200)
  })
}

function showToast(message) {
  const existing = document.querySelector('[data-testid="save-routine-success-toast"]')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.className = 'save-success-toast'
  toast.setAttribute('data-testid', 'save-routine-success-toast')
  toast.setAttribute('role', 'status')
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => toast.remove(), 2000)
}

export function renderCreateRoutineScreen(container) {
  renderScreen(container)
}
