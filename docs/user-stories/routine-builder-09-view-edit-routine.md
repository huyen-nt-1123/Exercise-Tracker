---
epic: routine-builder
story: 009
title: View and edit a saved routine in the create-routine flow
status: done
---

## Story

**As a** gym-goer who has saved a workout routine
**I want to** tap a saved routine to review its exercises and adjust them in the same build flow I used to create it
**So that** I can check what's in a routine and tweak sets, reps, or the exercise list without rebuilding it from scratch

---

## Background

Saved routines appear as Routine Cards in the Library ROUTINES tab (story 005). Today a card is only actionable via its Start button — there is no way to see the exercises inside or change them. This story makes the card body tappable so it opens the existing Create Routine build view (stories 006/004) pre-loaded with the routine's name and planned exercises. Because it reuses the build flow, the user can rename, add/remove exercises, and change set/rep targets, then save. Saving updates the **same** routine in place (its `id` is preserved) rather than creating a duplicate. This is a mobile-first PWA, so the primary interaction is a tap, and all reads/writes go through IndexedDB.

---

## Acceptance Criteria

### Scenario 1: Tapping a routine card opens it pre-loaded
```gherkin
Given the user is on the Library ROUTINES tab with a saved routine "Push Day" (Bench Press 4x8, Overhead Press 3x10)
When they tap the routine card body
Then the Create Routine build view opens
And the routine name field shows "Push Day"
And the plan-targets list shows Bench Press with 4 sets / 8 reps and Overhead Press with 3 sets / 10 reps
```

### Scenario 2: Edit view is visually distinguished from creating a new routine
```gherkin
Given the user has opened a saved routine for editing
Then the build view header reads "Edit Routine" (not "Create Routine")
And the save button reads "Save Changes" (not "Save Routine")
```

### Scenario 3: Editing targets and saving updates the routine in place
```gherkin
Given the user has opened "Push Day" for editing
When they change Bench Press to 5 sets and tap "Save Changes"
Then the routine "Push Day" is updated in IndexedDB with Bench Press at 5 sets
And no new routine is created (the ROUTINES tab still shows exactly one "Push Day" card)
And the card's total-sets badge reflects the new count
```

### Scenario 4: Adding and removing exercises while editing
```gherkin
Given the user is editing "Push Day"
When they add a new exercise from the EXERCISES tab and remove an existing one
And tap "Save Changes"
Then the saved "Push Day" reflects the updated exercise list
And the exercise-count badge on the card updates accordingly
```

### Scenario 5: Renaming with an empty name is blocked
```gherkin
Given the user is editing "Push Day"
When they clear the routine name field and tap "Save Changes"
Then the save is blocked
And the inline name error "Please give your routine a name" is shown
```

### Scenario 6: Leaving the edit view warns about unsaved changes
```gherkin
Given the user is editing a saved routine
When they tap the back/discard control
Then a confirmation dialog is shown titled "Discard changes?" with body "Your unsaved changes will be lost"
And it offers "Discard" (confirm) and "Keep editing" (cancel)
And confirming returns to the saved-routines list with the original routine unchanged
```

### Scenario 7: The Start button does not open the edit view
```gherkin
Given the user is on the ROUTINES tab
When they tap the card's Start button (not the card body)
Then the start-session action runs
And the edit view is not opened
```

---

## data-testid Values

- `routine-card` — the saved routine card; its body is tappable to open the edit view (identify by `data-routine-id`)
- `routine-card-start-btn` — quick-start button on the card; must not trigger the edit view
- `create-routine-screen` — the build/edit view container (shared with create flow)
- `routine-name-input` — routine name field, pre-filled when editing
- `plan-targets-section` — list of planned exercises with their set/rep targets
- `save-routine-btn` — save/confirm button; label is "Save Changes" in edit mode
- `discard-routine-btn` — back/discard control in the build view
- `discard-routine-dialog` — confirmation dialog shown when leaving with unsaved changes
- `discard-confirm-btn` — "Discard" action
- `discard-cancel-btn` — "Keep editing" action
