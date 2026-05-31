---
epic: routine-builder
story: 006
title: Build a routine inside the Library Routines tab
status: done
---

## Story

**As a** consistent gym-goer building a workout plan
**I want to** create my routine inside the Library's ROUTINES tab and switch to the EXERCISES tab to add exercises
**So that** I can hop back to my in-progress routine at any time to check what I've already added before saving

---

## Background

Today, Create Routine is a standalone screen (`#/create-routine`) separate from the Exercise Library. Once a user taps "Add Exercises" and lands in the library, there is no clear way back to the in-progress routine to review what has been added — the two screens feel disconnected.

This story moves routine building **inside the Library screen's ROUTINES tab** as a sub-view, so that building a routine and adding exercises both live under one screen. The ROUTINES tab toggles between two states: the **saved-routines list** (default) and the **build view** (name input + planned exercises). The EXERCISES tab is where exercises are browsed and PLANned. The in-progress (draft) routine is held in app state — not committed to IndexedDB — until the user saves (per story 005).

This story defines the navigation/IA model. It supersedes the standalone Create Routine screen referenced in stories 001, 003, and 005; their navigation targets are updated accordingly. Visual styling of cards is covered by story 003 (bento cards); the floating check button used to return from the EXERCISES tab is covered by story 007.

---

## Acceptance Criteria

### Scenario 1: ROUTINES tab shows the saved-routines list by default
```gherkin
Given the user opens the Library screen
When the ROUTINES tab is active and no routine is being built
Then the saved-routines list is shown (or its empty state if none exist)
And the build view is not shown
```

### Scenario 2: Entering build mode shows the build view inside the ROUTINES tab
```gherkin
Given the user is on the Library ROUTINES tab
When they start building a new routine (via the floating "+" action or the empty-state CTA)
Then the ROUTINES tab switches to the build view
And the build view shows the "New Program / Create Routine" heading, the routine name input, and the plan-targets area
And the bottom navigation still shows Library as the active tab
```

### Scenario 3: Adding exercises switches to the EXERCISES tab
```gherkin
Given the user is in the build view on the ROUTINES tab
When they tap "Add Exercises"
Then the EXERCISES tab becomes active
And the exercise library list is shown so they can PLAN exercises (story 003)
And the routine draft (name + already-added exercises) is preserved in app state
```

### Scenario 4: Returning to the ROUTINES tab shows the draft with added exercises
```gherkin
Given the user has PLANned one or more exercises from the EXERCISES tab
When they return to the ROUTINES tab (via the floating check button or by tapping the ROUTINES tab)
Then the build view is shown again (not the saved list)
And every exercise they PLANned appears in the plan-targets list with its set/rep steppers
And the routine name they entered earlier is still populated
```

### Scenario 5: Draft persists across tab switches but not across save/discard
```gherkin
Given the user has entered a routine name and added exercises in the build view
When they switch between the ROUTINES and EXERCISES tabs multiple times
Then the draft name and exercise list are retained each time the build view is shown
And the draft is only cleared when the routine is saved (story 005) or discarded (story 008)
```

### Scenario 6: Saving returns to the saved-routines list in the same tab
```gherkin
Given the user is in the build view with a valid routine name and at least one exercise
When they save the routine (story 005)
Then the draft is cleared
And the ROUTINES tab returns to the saved-routines list state
And the newly saved routine appears in that list
```

### Scenario 7: Entering build mode from Home
```gherkin
Given the user taps a "build a routine" entry point on Home (e.g. "Build Your First Workout" or the Home FAB)
When the navigation completes
Then the Library screen opens with the ROUTINES tab active in build view
```

---

## data-testid Values

- `library-routines-list-view` — wrapper shown when the ROUTINES tab is in saved-list state
- `library-routines-build-view` — wrapper shown when the ROUTINES tab is in build (create-routine) state
- `create-routine-screen` — build view root container (existing; now rendered inside the ROUTINES tab)
- `routines-tab` — "ROUTINES" tab button (existing)
- `exercises-tab` — "EXERCISES" tab button (existing)
- `add-exercises-btn` — switches from build view to the EXERCISES tab (existing)
- `build-routine-btn` — empty-state CTA in the ROUTINES list that enters build view (when no FAB is used)
- `routine-name-input` — routine name field within the build view (existing)
- `plan-targets-section` — list of planned exercises within the build view (existing)
