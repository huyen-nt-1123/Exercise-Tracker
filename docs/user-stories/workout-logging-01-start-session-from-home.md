---
epic: workout-logging
story: 001
title: See today's routine on the home dashboard and start a workout session
status: ready
---

## Story

**As a** consistent gym-goer arriving at the gym  
**I want to** see today's planned workout on the home screen and start it with a single tap  
**So that** I can begin logging immediately without navigating through menus

---

## Background

The "Home Dashboard" Figma screen (shown when a user has at least one saved routine) features:
- Welcome message: "WELCOME BACK, CHAMP! You're on fire."
- A prominent "Today's Session Card" showing:
  - A "CURRENT PROGRAM" pill badge
  - Routine name (e.g. "Today's Push Day")
  - Focus muscles (e.g. "Chest, Shoulders & Triceps")
  - Exercise abbreviation bubbles (e.g. "BP", "OH", "TD")
  - "5 Exercises planned" count
  - A green **START WORKOUT** button
- A "Recent Activity" section listing past sessions

The first saved routine is treated as today's workout for MVP (no day-scheduling logic in v1). When the user taps START WORKOUT, a new Session is created in IndexedDB linked to the routine, and they are navigated to the Active Workout Logging screen.

---

## Acceptance Criteria

### Scenario 1: Home dashboard shows when a routine exists
```gherkin
Given the user has at least one saved routine (e.g. "Push Day")
When they open the app or tap the Home tab
Then they see the Home Dashboard (not the empty state)
And the "Today's Session Card" shows the routine name "Today's Push Day"
And the card shows the total exercise count ("3 Exercises planned" or however many are in the routine)
And a green "START WORKOUT" button is visible on the card
```

### Scenario 2: Tapping START WORKOUT begins a new session
```gherkin
Given the user is on the Home Dashboard
When they tap the "START WORKOUT" button
Then a new workout session is created in storage linked to the routine
And they are navigated to the Active Workout Logging screen
And the screen title shows the routine name (e.g. "Push Day")
And the session timer starts counting from 00:00
And the first exercise in the routine is shown in its card, expanded
```

### Scenario 3: Recent activity is shown below the session card
```gherkin
Given the user has completed at least one previous workout session
When they view the Home Dashboard
Then the "Recent Activity" section lists their most recent sessions
And each activity item shows the routine name and date
And a "VIEW ALL" link is present (navigates to History — out of scope for this epic)
```

### Scenario 4: Only one active session can run at a time
```gherkin
Given the user already has an active (in-progress) session
When they tap "START WORKOUT" again
Then a confirmation modal appears: "You have a workout in progress. Resume it or discard?"
And they can choose to resume the existing session or discard it and start fresh
```

---

## data-testid Values

- `home-dashboard` — root container for the Home Dashboard screen
- `welcome-message` — "WELCOME BACK, CHAMP!" label
- `today-session-card` — the main session card container
- `current-program-badge` — "CURRENT PROGRAM" pill label
- `today-session-name` — routine name heading on the card (e.g. "Today's Push Day")
- `today-session-muscles` — muscle focus subtext (e.g. "Chest, Shoulders & Triceps")
- `today-session-exercise-bubbles` — row of exercise abbreviation bubbles
- `today-session-exercise-count` — "N Exercises planned" count label
- `start-workout-btn` — "START WORKOUT" green action button
- `recent-activity-section` — container for past session activity items
- `activity-item` — individual past session row (repeated)
- `active-session-conflict-modal` — confirmation dialog when a session is already in progress
