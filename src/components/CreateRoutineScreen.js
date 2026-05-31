import '../styles/create-routine-screen.css'
import { store, emitChange, clearDraft } from '../utils/store.js'
import { saveRoutine } from '../utils/db.js'
import { EXERCISES_SEED } from '../utils/exercises-seed.js'

function getExerciseById(id) {
  return EXERCISES_SEED.find(e => e.id === id)
}

function formatMuscleLabel(muscleGroups) {
  return muscleGroups.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(' & ')
}

function draftHasContent() {
  const draft = store.draftRoutine
  return draft.name.trim().length > 0 || draft.exercises.length > 0
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

function renderScreen(container, options) {
  const draft = store.draftRoutine
  const hasExercises = draft.exercises.length > 0

  container.innerHTML = `
    <div class="create-routine-screen" data-testid="create-routine-screen">
      <div class="create-routine__header">
        <button
          class="create-routine__back"
          data-testid="discard-routine-btn"
          type="button"
          aria-label="Discard routine"
        >←</button>
        <div class="create-routine__heading">
          <span class="create-routine__label">New Program</span>
          <h1 class="create-routine__title">Create Routine</h1>
        </div>
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

  attachListeners(container, options)
}

function attachListeners(container, options) {
  const draft = store.draftRoutine

  // Sync name input to store
  const nameInput = container.querySelector('[data-testid="routine-name-input"]')
  nameInput.addEventListener('input', () => {
    draft.name = nameInput.value
    draft.showNameError = false
    nameInput.classList.remove('routine-name-card__input--error')
    container.querySelector('[data-testid="routine-name-error"]').classList.remove('routine-name-card__error--visible')
  })

  // Discard / back control (story 008)
  container.querySelector('[data-testid="discard-routine-btn"]').addEventListener('click', () => {
    draft.name = nameInput.value
    if (draftHasContent()) {
      openDiscardDialog(container, options)
    } else {
      exitBuild(options)
    }
  })

  // Switch to the EXERCISES tab to add exercises (story 006)
  container.querySelector('[data-testid="add-exercises-btn"]').addEventListener('click', () => {
    draft.name = nameInput.value
    options.onGoToExercises()
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
      renderScreen(container, options)
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

    clearDraft()
    emitChange()
    showToast('Routine saved!')
    options.onExitToList()
  })
}

// Clear the draft and return the ROUTINES tab to its saved-list state.
function exitBuild(options) {
  clearDraft()
  emitChange()
  options.onExitToList()
}

// Discard confirmation dialog (story 008). Only shown when the draft has
// content; accessible (focus moves in, Escape cancels, focus returns).
function openDiscardDialog(container, options) {
  const trigger = container.querySelector('[data-testid="discard-routine-btn"]')

  const overlay = document.createElement('div')
  overlay.className = 'discard-dialog-overlay'
  overlay.innerHTML = `
    <div
      class="discard-dialog"
      data-testid="discard-routine-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discard-dialog-title"
    >
      <h2 class="discard-dialog__title" id="discard-dialog-title">Discard this routine?</h2>
      <p class="discard-dialog__body">Your draft routine and added exercises will be lost.</p>
      <div class="discard-dialog__actions">
        <button class="btn discard-dialog__cancel" data-testid="discard-cancel-btn" type="button">
          Keep editing
        </button>
        <button class="btn discard-dialog__confirm" data-testid="discard-confirm-btn" type="button">
          Discard
        </button>
      </div>
    </div>
  `
  document.body.appendChild(overlay)

  const dialog = overlay.querySelector('[data-testid="discard-routine-dialog"]')
  const cancelBtn = overlay.querySelector('[data-testid="discard-cancel-btn"]')
  const confirmBtn = overlay.querySelector('[data-testid="discard-confirm-btn"]')

  function close() {
    overlay.removeEventListener('keydown', onKeydown)
    overlay.remove()
    if (trigger && document.contains(trigger)) trigger.focus()
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      // Simple two-button focus trap.
      e.preventDefault()
      const next = document.activeElement === confirmBtn ? cancelBtn : confirmBtn
      next.focus()
    }
  }

  cancelBtn.addEventListener('click', close)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) close()
  })
  confirmBtn.addEventListener('click', () => {
    overlay.removeEventListener('keydown', onKeydown)
    overlay.remove()
    exitBuild(options)
  })
  overlay.addEventListener('keydown', onKeydown)

  // Move focus into the dialog.
  requestAnimationFrame(() => {
    dialog.focus?.()
    confirmBtn.focus()
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

export function renderRoutineBuildView(container, options) {
  renderScreen(container, options)
}
