---
epic: workout-logging
story: 004
title: Finish a workout session and view the summary screen
status: ready
---

## Story

**As a** consistent gym-goer who has completed all their exercises  
**I want to** finish my session and see a summary of what I accomplished  
**So that** I feel a sense of achievement and can track my progress over time

---

## Background

The "Workout Summary" Figma screen shows after a session is completed:
- A celebration section: "Workout\nComplete!" heading in primary green + celebration emoji
- A stats grid with three cards:
  - **Total Volume**: e.g. "4,500 kg" (sum of sets × reps × weight)
  - **Duration**: e.g. "45 min" (elapsed session time)
  - **PRs Broken**: e.g. "3" (count of new personal records set this session)
- A "Progress/Post Workout Section Placeholder" (v2 — charts are out of scope for this story)
- A sticky bottom bar with a single **Done** button

Tapping "Done" dismisses the summary and returns the user to the Home Dashboard. The session is saved to IndexedDB at the moment all exercises are completed (or when "Finish Workout" is explicitly tapped — see edge case below).

---

## Acceptance Criteria

### Scenario 1: Finish Workout button appears after all sets are completed
```gherkin
Given the user is in an active session
And they have completed all sets for all exercises (progress bar = 100%)
Then a "Finish Workout" button becomes the primary action
And it is prominently displayed (e.g. replaces or highlights the FAB)
```

### Scenario 2: Workout summary screen shows after tapping Finish Workout
```gherkin
Given the user taps "Finish Workout"
Then the session is saved to IndexedDB with all logged sets, weights, and reps
And they are navigated to the Workout Summary screen
And the heading shows "Workout Complete!"
And the Total Volume stat shows the correct sum (sets × reps × weight for all completed sets)
And the Duration stat shows the elapsed session time rounded to the nearest minute
```

### Scenario 3: PRs Broken stat is correctly calculated
```gherkin
Given the user logged 65kg x 8 for Bench Press
And their previous best for Bench Press was 62.5kg x 8
When the Workout Summary screen shows
Then the "PRs Broken" count is at least 1
And the PR is for "Bench Press — 65kg"
```

### Scenario 4: Tapping Done returns to Home Dashboard
```gherkin
Given the user is on the Workout Summary screen
When they tap the "Done" button
Then they are navigated to the Home Dashboard
And the session they just completed appears in the "Recent Activity" list
And the progress bar and timer on the now-saved session are no longer running
```

### Scenario 5: User can finish session early (not all exercises complete)
```gherkin
Given the user is in an active session with exercises remaining
When they tap a "Finish Early" or back-navigation option
Then a confirmation dialog appears: "Finish workout now? X exercises incomplete."
When they confirm
Then the session is saved with only the completed sets recorded
And they are taken to the Workout Summary screen showing partial results
And incomplete exercises are excluded from the stats
```

### Scenario 6: Summary persists if user navigates away and returns (within same app session)
```gherkin
Given the user is on the Workout Summary screen
When they switch to a different tab and then navigate back to History
Then the completed session is listed in History with the correct date, duration, and volume
```

---

## data-testid Values

- `finish-workout-btn` — "Finish Workout" primary action button (shown when progress = 100% or via early-finish)
- `finish-early-btn` — secondary option to end the session before all exercises are done
- `finish-early-modal` — confirmation dialog for finishing early
- `workout-summary-screen` — root container of the summary screen
- `summary-headline` — "Workout Complete!" heading
- `summary-celebration-icon` — celebration emoji/icon (decorative)
- `total-volume-stat` — Total Volume stat card
- `total-volume-value` — the numeric volume value (e.g. "4,500")
- `total-volume-unit` — unit label ("kg")
- `duration-stat` — Duration stat card
- `duration-value` — the numeric duration value (e.g. "45")
- `duration-unit` — unit label ("min")
- `prs-broken-stat` — PRs Broken stat card
- `prs-broken-value` — the PR count value (e.g. "3")
- `finish-session-btn` — "Done" button that dismisses the summary and returns to Home
