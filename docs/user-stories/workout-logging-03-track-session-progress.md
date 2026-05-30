---
epic: workout-logging
story: 003
title: View progress bar and session timer during an active workout
status: ready
---

## Story

**As a** consistent gym-goer in the middle of a workout  
**I want to** see how much of my session I've completed and how long I've been training  
**So that** I can pace myself and feel motivated by visible progress

---

## Background

The top section of the "Active Workout Logging" Figma screen contains a "Hero Header & Timer Section" with:
- Routine name heading (e.g. "Push Day")
- "SESSION TIME" label + live elapsed timer (e.g. "24:18")
- A **Bubbly Progress Bar** — a wide pill-shaped bar showing completion percentage
- Below the bar: "2 of 6 Exercises done" and "33%" percentage label

The progress bar fills from left to right as exercises are completed. Completing all sets for an exercise marks it as done for the purposes of the progress count.

The session timer starts the moment the user taps "START WORKOUT" and continues ticking until the session is finished or discarded.

---

## Acceptance Criteria

### Scenario 1: Session timer starts at 00:00 and counts up
```gherkin
Given the user has just tapped "START WORKOUT"
When the Active Workout Logging screen loads
Then the SESSION TIME label is visible
And the timer shows "00:00" and immediately begins counting upward (MM:SS format)
And the timer continues running as the user logs sets
```

### Scenario 2: Progress bar initialises at 0% with exercises not yet done
```gherkin
Given the user starts a session for "Push Day" which has 6 exercises
When the Active Workout Logging screen first loads
Then the progress bar shows 0% fill
And the label reads "0 of 6 Exercises done" and "0%"
```

### Scenario 3: Progress bar updates when all sets for an exercise are completed
```gherkin
Given the user has a routine with 6 exercises
And all sets for "Bench Press" (the first exercise) are marked complete
Then the progress bar updates to approximately 17% fill (1/6)
And the label reads "1 of 6 Exercises done" and "17%"
```

### Scenario 4: Progress bar reaches 100% when all exercises are done
```gherkin
Given the user has completed all sets for all exercises in the session
Then the progress bar shows 100% fill
And the label reads "6 of 6 Exercises done" and "100%"
And a "Finish Workout" prompt or button becomes prominent
```

### Scenario 5: Timer and progress persist if user scrolls or leaves screen briefly
```gherkin
Given the session timer shows "12:34" and progress shows "2 of 6 Exercises done"
When the user scrolls down to view lower exercises and then scrolls back up
Then the timer has continued counting (e.g. now shows "12:41")
And the progress still shows "2 of 6 Exercises done"
```

---

## data-testid Values

- `session-hero-header` — the sticky top section containing timer and progress
- `session-routine-name` — routine name heading (e.g. "Push Day") at the top of the session
- `session-timer-label` — "SESSION TIME" caps label
- `session-timer` — live elapsed timer display (e.g. "24:18")
- `session-progress-bar` — the pill-shaped progress bar element
- `session-progress-fill` — the filled inner portion of the progress bar (width driven inline by JS)
- `exercises-done-count` — "N of M Exercises done" label
- `exercises-done-percent` — "NN%" percentage label
