---
epic: routine-builder
story: 003
title: Browse the exercise library and add exercises to a routine
status: ready
---

## Story

**As a** consistent gym-goer building a new routine  
**I want to** browse a searchable exercise library and add exercises to my routine  
**So that** I can build a complete plan without having to type exercise names manually

---

## Background

The "Exercise Library & Planning" Figma screen (accessed via "Add Exercises" button) shows:
- A tab strip at the top: **ROUTINES** | **EXERCISES** (EXERCISES active in this flow)
- A search bar: placeholder "Search exercises..."
- A filter icon button (for muscle group filtering)
- A grid of exercise cards, each showing:
  - Exercise name (e.g. "Barbell Bench Press")
  - Muscle group chip (e.g. "Chest / Triceps")
  - "Last: 185lbs" performance hint (when history exists)
  - A "+" expand button (top-right of card header)
  - A row showing planned targets: **3 Sets**, **10 Reps** pill chips + a **PLAN** button
- The count of results shown ("48 Results")

Tapping "PLAN" adds the exercise (with its set/rep targets) to the routine being built.

Exercise library is seeded from a built-in list (stored in IndexedDB). No network required.

---

## Acceptance Criteria

### Scenario 1: Exercise library opens from Create Routine screen
```gherkin
Given the user is on the Create Routine screen
When they tap the "Add Exercises" button
Then the Exercise Library screen opens in EXERCISES tab view
And the search bar is visible and auto-focused
And a list of exercise cards is displayed
And each card shows the exercise name and muscle group chip
```

### Scenario 2: User can search for an exercise by name
```gherkin
Given the user is on the Exercise Library screen (EXERCISES tab)
When they type "bench" in the search bar
Then only exercises with "bench" in their name are shown
And the results count updates to reflect the filtered list
When they clear the search bar
Then all exercises are shown again
```

### Scenario 3: User adds an exercise to the routine
```gherkin
Given the user is viewing the Exercise Library (EXERCISES tab)
And a routine is being created in the background
When they tap the "PLAN" button on the "Barbell Bench Press" card
Then "Barbell Bench Press" is added to the routine's exercise list
And a confirmation (e.g. a brief toast or visual feedback) is shown
And the exercise card shows a visual "added" state (e.g. PLAN button changes to a checkmark or "Added")
```

### Scenario 4: User adds multiple exercises
```gherkin
Given the user has added "Barbell Bench Press" to the routine
When they also tap "PLAN" on "Overhead Press" and "Tricep Pushdown"
Then all three exercises are queued in the routine
When they return to the Create Routine screen
Then all three exercises appear in the exercise list section
```

### Scenario 5: Search returns no results
```gherkin
Given the user types "xyz123" in the search bar
Then the exercise grid shows an empty state: "No exercises found"
And the results count shows "0 Results"
```

---

## data-testid Values

- `exercise-library-screen` — root container
- `exercises-tab` — "EXERCISES" tab button
- `routines-tab` — "ROUTINES" tab button
- `exercise-search-input` — search text input
- `exercise-filter-btn` — muscle group filter icon button
- `exercise-results-count` — "48 Results" label
- `exercise-card` — individual exercise card (repeated; identify by `data-exercise-id` attribute)
- `exercise-name` — exercise name heading within a card
- `exercise-muscle-chip` — muscle group pill label within a card
- `exercise-last-hint` — "Last: Xkg" performance hint (only shown when history exists)
- `exercise-plan-btn` — "PLAN" button to add exercise to routine
- `exercise-sets-display` — "3 Sets" pill within the card's target row
- `exercise-reps-display` — "10 Reps" pill within the card's target row
- `exercise-library-empty-state` — shown when search returns no results
