---
epic: routine-builder
story: 010
title: Create a new routine from the saved-routines list via the FAB
status: done
---

## Story

**As a** user who already has one or more saved routines
**I want to** a floating "+" button on the saved-routines list that starts a new routine
**So that** I can add another routine without leaving the list or hunting for a create action

---

## Background

The shared FAB (story 007) currently appears on Home to start building a routine and on the EXERCISES tab to confirm added exercises, but it is intentionally hidden on the saved-routines list — so once routines exist, the only create entry point is the empty-state "Build a Routine" button, which disappears as soon as the list is non-empty. This story registers a new FAB context for the saved-routines list: a `+` that enters routine-build mode in place (story 006), exactly like the Home FAB but without leaving the Library screen. The FAB keeps its single shared appearance (size, position, colour, shadow) from story 007 — only the action context is new.

---

## Acceptance Criteria

### Scenario 1: FAB is shown on the saved-routines list
```gherkin
Given the user is on the Library ROUTINES tab viewing the saved-routines list
And no routine is currently being built
Then the shared FAB is visible in the bottom-right with a "+" icon
And its accessible label reads "Build a routine"
```

### Scenario 2: Tapping the FAB enters build mode in place
```gherkin
Given the user is viewing the saved-routines list
When they tap the FAB
Then the ROUTINES tab switches to the Create Routine build view
And the build view starts empty (no name, no exercises)
And the user remains on the Library screen (no full-page navigation)
```

### Scenario 3: FAB appearance is unchanged from the shared component
```gherkin
Given the FAB is shown on the saved-routines list
Then it is the same 64×64px circular primary-container green button with the green glow shadow used elsewhere
And only its icon, action, and accessible label come from the routines-list context
```

### Scenario 4: FAB is hidden while building
```gherkin
Given the user has tapped the FAB and is now in the Create Routine build view
Then the routines-list "+" FAB is no longer shown
And the build view's own back and save controls are used instead
```

### Scenario 5: Empty-state button still works alongside the FAB
```gherkin
Given the user has no saved routines
Then the empty-state "Build a Routine" button is shown
And tapping either it or the FAB enters the same build view
```

---

## data-testid Values

- `fab` — the shared floating action button (reused); on the routines list it shows the "+" build action
- `fab-icon` — the icon container inside the FAB
- `build-routine-btn` — empty-state "Build a Routine" button (existing); coexists with the FAB
- `create-routine-screen` — the build view entered when the FAB is tapped
