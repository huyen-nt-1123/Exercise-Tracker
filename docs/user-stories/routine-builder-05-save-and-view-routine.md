---
epic: routine-builder
story: 005
title: Save a routine and view it in the library
status: ready
---

## Story

**As a** consistent gym-goer who has finished configuring a workout plan  
**I want to** save my routine so it persists across app sessions  
**So that** I can load it whenever I arrive at the gym without having to re-enter it

---

## Background

Once exercises and targets are set on the Create Routine screen, the user taps a save/confirm action. The routine is written to IndexedDB and becomes visible in:
- The "Exercise Library - Routines & Exercises" screen under the **ROUTINES** tab, showing a **Routine Card** with the routine name, focus muscle group summary, exercise count, and total sets count.
- The **Home Dashboard** as "Today's [Routine Name]" card.

The "Exercise Library - Routines & Exercises" Figma screen shows two example routine cards:
- "Push Day" — Focus: Chest, Shoulders, Triceps — 6 EXERCISES / 18 TOTAL SETS
- "Pull Day" — Focus: Back, Biceps, Forearms — 5 EXERCISES

Each routine card is tappable (to view/edit the routine details).

---

## Acceptance Criteria

### Scenario 1: Save routine button is present and enabled when valid
```gherkin
Given the user has entered a routine name
And added at least one exercise with valid set/rep targets
When they view the Create Routine screen
Then the "Save Routine" button is visible and enabled
```

### Scenario 2: Save routine persists to storage
```gherkin
Given the user has set up "Push Day" with Bench Press (4x8), Overhead Press (3x10), Tricep Pushdown (3x12)
When they tap "Save Routine"
Then a success toast or confirmation is briefly shown
And they are navigated to the Exercise Library (ROUTINES tab) or Home Dashboard
And the routine "Push Day" appears as a Routine Card in the ROUTINES tab
And the card shows "3 EXERCISES" and the correct total set count
```

### Scenario 3: Routine card shows correct summary data
```gherkin
Given the user saved "Push Day" with exercises targeting chest, shoulders, and triceps
When they view the ROUTINES tab of the Exercise Library
Then the "Push Day" routine card shows:
  - Routine name: "Push Day"
  - Muscle group focus: "Chest, Shoulders, Triceps"
  - Exercise count badge (e.g. "3 EXERCISES")
  - Total sets badge (e.g. "9 TOTAL SETS")
```

### Scenario 4: Routine persists after app is closed and reopened
```gherkin
Given the user has saved "Push Day"
When they close the browser tab and reopen the app
And navigate to the Exercise Library (ROUTINES tab)
Then "Push Day" is still visible in the routines list
```

### Scenario 5: Save is blocked if routine name is missing
```gherkin
Given the user has added exercises but has not entered a routine name
When they tap "Save Routine"
Then the save action is blocked
And an inline error is shown on the name input: "Please give your routine a name"
```

### Scenario 6: Multiple routines can be saved
```gherkin
Given the user already has "Push Day" saved
When they create and save a new routine named "Pull Day"
Then both "Push Day" and "Pull Day" appear in the ROUTINES tab
And they are listed in the order they were created (newest last or newest first — consistent)
```

---

## data-testid Values

- `save-routine-btn` — "Save Routine" / confirm button on the Create Routine screen
- `save-routine-success-toast` — transient success confirmation message
- `routines-list` — container holding all routine cards in the ROUTINES tab
- `routine-card` — individual routine card (repeated; identify by `data-routine-id`)
- `routine-card-name` — routine name heading on the card
- `routine-card-focus` — muscle group focus subtext on the card
- `routine-card-exercise-count` — "N EXERCISES" badge on the card
- `routine-card-set-count` — "N TOTAL SETS" badge on the card
- `routine-card-start-btn` — quick-start button on the routine card (launches session directly)
