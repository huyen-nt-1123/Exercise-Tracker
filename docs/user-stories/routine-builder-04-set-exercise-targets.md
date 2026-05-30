---
epic: routine-builder
story: 004
title: Set sets and reps targets for each exercise in a routine
status: ready
---

## Story

**As a** consistent gym-goer building a structured routine  
**I want to** set a target number of sets and reps for each exercise in my plan  
**So that** I know exactly what I need to do when I start the workout session

---

## Background

The "Plan Targets - Stepper Hybrid Style" Figma screen shows the routine builder with exercises already added. Each exercise appears as a card with:
- Exercise name (e.g. "Bench Press") and muscle group tag ("CHEST & TRICEPS")
- A stepper/input for **sets** (e.g. 3)
- A stepper/input for **reps** (e.g. 10)
- Optionally a weight suggestion field

The section is headed "Plan Targets" with subtext "Set your goals for today's session."

Targets are per-exercise within the routine (not per-session). They become the planned set rows shown in the Active Workout Logging screen.

---

## Acceptance Criteria

### Scenario 1: User sees target inputs for each added exercise
```gherkin
Given the user is on the Create Routine screen
And at least one exercise has been added (e.g. "Bench Press")
When they view the exercise card
Then they see a "sets" stepper/input and a "reps" stepper/input
And the default values are 3 sets and 10 reps
```

### Scenario 2: User increases sets using the stepper
```gherkin
Given the user is viewing an exercise card for "Bench Press" with 3 sets default
When they tap the increment (+) button on the sets stepper
Then the sets value increases to 4
When they tap the increment (+) button again
Then the sets value increases to 5
```

### Scenario 3: User decreases sets using the stepper (minimum 1)
```gherkin
Given the user has "Bench Press" set to 3 sets
When they tap the decrement (-) button on the sets stepper
Then the sets value decreases to 2
When they tap the decrement (-) button when the value is 1
Then the value stays at 1 and the decrement button is disabled or has no effect
```

### Scenario 4: User types a custom value directly
```gherkin
Given the user is viewing an exercise card for "Overhead Press"
When they tap directly on the reps input field
Then the field becomes editable and shows a cursor
When they clear the field and type "12"
Then the reps value is set to 12
```

### Scenario 5: Invalid values are rejected
```gherkin
Given the user taps the reps input and types "0"
Then the value is rejected and reverts to the previous valid value (minimum is 1)
Given the user types a non-numeric value like "abc"
Then the input shows an error state and does not save the invalid value
```

### Scenario 6: Targets are included when the routine is saved
```gherkin
Given the user has set Bench Press to 4 sets x 8 reps
And Overhead Press to 3 sets x 10 reps
When they save the routine
Then the saved routine contains both exercises with their respective set/rep targets
When they later start a workout session using this routine
Then the Active Workout Logging screen shows 4 set rows for Bench Press and 3 for Overhead Press
```

---

## data-testid Values

- `plan-targets-section` — container for the exercise target cards
- `plan-targets-heading` — "Plan Targets" section heading
- `exercise-target-card` — individual exercise card with target controls (repeated; identify by `data-exercise-id`)
- `exercise-target-name` — exercise name within the target card
- `exercise-target-muscle` — muscle group label within the target card
- `sets-decrement-btn` — "-" stepper button for sets
- `sets-value` — current sets count display/input
- `sets-increment-btn` — "+" stepper button for sets
- `reps-decrement-btn` — "-" stepper button for reps
- `reps-value` — current reps count display/input
- `reps-increment-btn` — "+" stepper button for reps
- `remove-exercise-btn` — button to remove an exercise from the routine (on each card)
