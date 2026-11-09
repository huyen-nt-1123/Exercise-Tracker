// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
import '../styles/create-routine-screen.css'
import { store, emitChange, clearDraft } from '../utils/store.js'
import { saveRoutine, deleteRoutine } from '../utils/db.js'
import { EXERCISES_SEED } from '../utils/exercises-seed.js'
import { openConfirmDialog } from './ConfirmDialog.js'
import { showToast } from './Toast.js'

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
  const isEditing = draft.id != null

  container.innerHTML = `
    <div class="create-routine-screen" data-testid="create-routine-screen">
      <div class="create-routine__header">
        <button
          class="create-routine__back"
          data-testid="discard-routine-btn"
          type="button"
          aria-label="${isEditing ? 'Back' : 'Discard routine'}"
        >←</button>
        <div class="create-routine__heading">
          <span class="create-routine__label">${isEditing ? 'Edit Program' : 'New Program'}</span>
          <h1 class="create-routine__title">${isEditing ? 'Edit Routine' : 'Create Routine'}</h1>
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
          ${isEditing ? 'Save Changes' : 'Save Routine'}
        </button>
        ${isEditing ? `
          <button class="delete-routine-btn" data-testid="delete-routine-btn" type="button">
            Delete Routine
          </button>
        ` : ''}
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

    const isEditing = draft.id != null

    await saveRoutine({
      id: draft.id ?? crypto.randomUUID(),
      name: draft.name,
      exercises: draft.exercises.map(e => ({ exerciseId: e.exerciseId, sets: e.sets, reps: e.reps, weight: null })),
      createdAt: draft.createdAt ?? new Date().toISOString(),
    })

    clearDraft()
    emitChange()
    showToast(isEditing ? 'Changes saved!' : 'Routine saved!')
    options.onExitToList()
  })

  // Delete (edit mode only, story 011)
  const deleteBtn = container.querySelector('[data-testid="delete-routine-btn"]')
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      openConfirmDialog({
        title: 'Delete this routine?',
        body: `${draft.name || 'This routine'} will be permanently removed.`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        dialogTestId: 'delete-routine-dialog',
        confirmTestId: 'delete-confirm-btn',
        cancelTestId: 'delete-cancel-btn',
        trigger: deleteBtn,
        onConfirm: async () => {
          await deleteRoutine(draft.id)
          clearDraft()
          emitChange()
          showToast('Routine deleted')
          options.onExitToList()
        },
      })
    })
  }
}

// Clear the draft and return the ROUTINES tab to its saved-list state.
function exitBuild(options) {
  clearDraft()
  emitChange()
  options.onExitToList()
}

// Discard confirmation dialog. Only shown when the draft has content; copy
// adapts to whether a new routine is being created (story 008) or an existing
// one is being edited (story 009 — the routine itself is not removed).
function openDiscardDialog(container, options) {
  const isEditing = store.draftRoutine.id != null
  openConfirmDialog({
    title: isEditing ? 'Discard changes?' : 'Discard this routine?',
    body: isEditing
      ? 'Your unsaved changes will be lost.'
      : 'Your draft routine and added exercises will be lost.',
    confirmLabel: 'Discard',
    cancelLabel: 'Keep editing',
    dialogTestId: 'discard-routine-dialog',
    confirmTestId: 'discard-confirm-btn',
    cancelTestId: 'discard-cancel-btn',
    trigger: container.querySelector('[data-testid="discard-routine-btn"]'),
    onConfirm: () => exitBuild(options),
  })
}

export function renderRoutineBuildView(container, options) {
  renderScreen(container, options)
}
