---
epic: rest-timer
story: 001
title: Rest timer auto-starts after completing a set and shows next set info
status: ready
---

## Story

**As a** consistent gym-goer who has just finished a set  
**I want to** see a rest countdown automatically start with information about my next set  
**So that** I never have to look at a clock or remember my rest time — the app manages it for me

---

## Background

The "Rest Timer" Figma screen shows a full-screen countdown experience triggered immediately after marking a set done:
- An **Info Card** at the top: "COMING UP NEXT" label + next set details (e.g. "Set 2 - Bench Press") + target weight (60 kg) and reps (10 reps) pill chips
- A **Status Indicator** pill: "RESTING PHASE" (green-tinted, primary background)
- A large **Main Kinetic Bubble Timer**: a circular animated bubble displaying the countdown in MM:SS format (e.g. "01:30") + "MINUTES REMAINING" sub-label
- Optionally a **Floating PR Badge** if the completed set was a personal record

The rest timer uses the Wake Lock API to keep the screen on during the rest period. Default rest duration is 90 seconds. The timer auto-navigates back to the Active Workout Logging screen when it reaches 00:00. The user can also skip the timer early.

---

## Acceptance Criteria

### Scenario 1: Rest timer screen opens immediately after marking a set done
```gherkin
Given the user is on the Active Workout Logging screen
When they tap the "DONE" button to complete a set
Then the Rest Timer screen is shown immediately (no extra tap required)
And the countdown starts from the configured rest duration (default 90 seconds)
And the "RESTING PHASE" status indicator is visible
```

### Scenario 2: "Coming up next" card shows the next set details
```gherkin
Given the user just completed Set 1 of Bench Press
When the Rest Timer screen loads
Then the Info Card shows "COMING UP NEXT"
And the card shows "Set 2 - Bench Press"
And it shows the target weight and reps for Set 2 (from the routine plan or last completed set)
```

### Scenario 3: Timer counts down to zero and auto-returns to workout
```gherkin
Given the rest timer is running with 5 seconds remaining
When the countdown reaches 00:00
Then the app plays an audio alert and/or triggers haptic feedback
And the rest timer screen dismisses automatically
And the user is returned to the Active Workout Logging screen
And the next set row is now the active row
```

### Scenario 4: User can skip the rest timer early
```gherkin
Given the rest timer is running showing "01:10" remaining
When the user taps the "Skip" button
Then the timer stops immediately
And the rest timer screen dismisses
And the user is returned to the Active Workout Logging screen
And the next set row is now the active row
```

### Scenario 5: Screen stays on during rest (Wake Lock)
```gherkin
Given the rest timer is running
Then the device screen should not dim or lock automatically
When the timer ends or the user skips
Then the Wake Lock is released and normal screen timeout behaviour resumes
```

### Scenario 6: PR badge appears if the completed set was a personal record
```gherkin
Given the user just completed a set with a weight higher than any previous logged weight for that exercise
When the Rest Timer screen loads
Then a "PERSONAL RECORD" badge or chip is shown on the rest timer screen
And it highlights the exercise name and new PR value
```

### Scenario 7: Rest timer after the final set of the final exercise
```gherkin
Given the user just completed the last set of the last exercise in the session
When they tap "DONE"
Then the rest timer does NOT start (no rest needed after the final set)
And the "Finish Workout" CTA is shown instead
```

---

## data-testid Values

- `rest-timer-screen` — root container of the rest timer screen
- `rest-coming-up-card` — "COMING UP NEXT" info card
- `rest-coming-up-label` — "COMING UP NEXT" caps label
- `rest-next-set-label` — "Set N - Exercise Name" label
- `rest-next-weight-chip` — target weight pill chip (e.g. "60 kg")
- `rest-next-reps-chip` — target reps pill chip (e.g. "10 reps")
- `rest-status-pill` — "RESTING PHASE" status indicator
- `rest-timer-bubble` — the main circular kinetic bubble container
- `rest-countdown` — the MM:SS countdown text inside the bubble
- `rest-countdown-label` — "MINUTES REMAINING" sub-label
- `skip-rest-btn` — button to skip the rest period early
- `rest-pr-badge` — floating PR achievement badge (only shown when a PR is set)
