---
epic: workout-logging
story: 002
title: Log weight and reps for a set and mark it complete
status: ready
---

## Story

**As a** consistent gym-goer mid-workout  
**I want to** quickly enter the weight and reps I just lifted and mark the set as done  
**So that** my performance is recorded without breaking my gym focus

---

## Background

The "Active Workout Logging" Figma screen shows an exercise card (e.g. "Bench Press") containing:
- Exercise name + muscle hint + "Last time: 60kg x 8" performance reference
- A table with columns: **SET** | **WEIGHT (KG)** | **REPS** | **DONE**
- Each set row has three states:
  - **Completed** (dimmed, shows logged values, checkmark icon)
  - **Active/Editing** (highlighted with primary-container border, weight/reps inputs with +/- steppers, a checkmark/done button)
  - **Upcoming** (muted, prefilled with target values from the routine plan)

The active set row contains:
- A weight input with decrement (−) and increment (+) stepper buttons (increments of 2.5)
- A reps input with decrement (−) and increment (+) stepper buttons
- A "DONE" checkmark button to mark the set complete

On marking complete, the rest timer auto-starts (see story `rest-timer-01`).

---

## Acceptance Criteria

### Scenario 1: Active set row shows editable inputs pre-filled with last session's values
```gherkin
Given the user is on the Active Workout Logging screen
And the current exercise is "Bench Press" with a target of 3 sets x 10 reps
And the previous session logged Set 1 as 60kg x 10 reps
When the user views Set 2 (the active set)
Then the weight input is pre-filled with 60 (last session's weight)
And the reps input is pre-filled with 10 (last session's reps or routine target)
And the "Last time: 60kg x 8" hint is visible above the set table
```

### Scenario 2: User adjusts weight using stepper buttons
```gherkin
Given the active set shows weight "60" kg
When the user taps the "+" button on the weight stepper
Then the weight increases to 62.5
When the user taps the "+" button again
Then the weight increases to 65
When the user taps the "−" button
Then the weight decreases back to 62.5
```

### Scenario 3: User adjusts reps using stepper buttons
```gherkin
Given the active set shows reps "10"
When the user taps the "−" button on the reps stepper
Then the reps decreases to 9
The minimum reps value is 1 — the "−" button is disabled at 1
```

### Scenario 4: User marks the set as done
```gherkin
Given the user has entered weight "62.5" and reps "8" for Set 2
When they tap the "DONE" checkmark button
Then Set 2 moves to the "Completed" state (dimmed row, showing 62.5 / 8 / ✓)
And Set 3 becomes the new active set row
And the rest timer starts automatically (see rest-timer-01)
And the session progress bar increments
```

### Scenario 5: First set in exercise has no prior history
```gherkin
Given the current exercise is brand new with no session history
When the user views the active set row
Then the weight input shows "0" or the routine's planned weight if specified
And the last-session hint is hidden
```

### Scenario 6: User can tap completed set to edit it
```gherkin
Given Set 1 is marked as completed with 60kg x 10
When the user taps on the completed Set 1 row
Then the row becomes editable again
And they can change the weight or reps
When they tap DONE again
Then the updated values are saved and the row returns to completed state
```

---

## data-testid Values

- `active-workout-screen` — root container for the active session screen
- `exercise-card` — individual exercise card (repeated; identify by `data-exercise-id`)
- `exercise-card-name` — exercise name heading within the card
- `last-session-hint` — "Last time: Xkg x N" hint label
- `set-logging-table` — container for the set rows table
- `set-row` — individual set row (repeated; identify by `data-set-number`)
- `set-number` — set number label (e.g. "1", "2", "3")
- `weight-decrement-btn` — "−" stepper button for weight
- `weight-input` — weight value input field
- `weight-increment-btn` — "+" stepper button for weight
- `reps-decrement-btn` — "−" stepper button for reps
- `reps-input` — reps value input field
- `reps-increment-btn` — "+" stepper button for reps
- `complete-set-btn` — "DONE" checkmark button for the active row
- `set-completed-icon` — checkmark icon on a completed row
